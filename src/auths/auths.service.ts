import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admins/entities/admin.entity';
import { Repository } from 'typeorm';
import * as Bycrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createAudit } from 'src/audit_logs/helper/createAudit.helper';
import { Request } from 'express';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';
import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(AuditLog)
    private auditRepository: Repository<AuditLog>,
    @InjectRepository<AdminLog>,
    private adminLogRepository: Repository<AdminLog>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_SECRET',
          ),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_SECRET',
          ),
          expiresIn: this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  private async hashData(data: string): Promise<string> {
    const salt = await Bycrypt.genSalt(10);
    return await Bycrypt.hash(data, salt);
  }

  private async saveRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.adminRepository.update(userId, {
      hashedRefreshToken: hashedRefreshToken,
    });
  }

  async signIn(createAuthDto: CreateAuthDto, request: Request) {
    const foundUser = await this.adminRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['admin_id', 'email', 'password'],
    });
    if (!foundUser) {
      throw new NotFoundException(
        `User with email ${createAuthDto.email} not found`,
      );
    }

    const foundPassword = await Bycrypt.compare(
      createAuthDto.password,
      foundUser.password,
    );
    if (!foundPassword) {
      throw new NotFoundException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.getTokens(
      foundUser.admin_id,
      foundUser.email,
    );

    await this.saveRefreshToken(foundUser.admin_id, refreshToken);

    const audit = await createAudit<Admin>(request, foundUser, "Admin signed in", "Admin logs table affected");
    this.auditRepository.save(audit);


    foundUser.admin_logs = [await this.adminLogRepository.save({login_time: new Date()})];

    return { accessToken, refreshToken };
  }

  async signOut(userId: string) {
    const res = await this.adminRepository.update(userId, {
      hashedRefreshToken: null,
    });

    if (res.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return { message: `User with id : ${userId} signed out successfully` };
  }

  async refreshTokens(id: number, refreshToken: string) {
    const foundUser = await this.adminRepository.findOne({
      where: { admin_id: id },
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!foundUser.hashedRefreshToken) {
      throw new NotFoundException('No refresh token found');
    }

    const refreshTokenMatches = await Bycrypt.compare(
      refreshToken,
      foundUser.hashedRefreshToken,
    );

    if (!refreshTokenMatches) {
      throw new NotFoundException('Invalid refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      foundUser.admin_id,
      foundUser.email,
    );

    await this.saveRefreshToken(foundUser.admin_id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
