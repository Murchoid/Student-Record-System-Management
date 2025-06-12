import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import * as Bcrypt from 'bcrypt';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';
import { AuditLogsModule } from 'src/audit_logs/audit_logs.module';
import { Request } from 'express';
import { createAudit } from 'src/audit_logs/helper/createAudit.helper';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(UserProfile)
    private adminProfileRepository: Repository<UserProfile>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLogsModule>,
  ) {}

  async create(
    createAdminDto: CreateAdminDto,
    request: Request,
  ): Promise<Admin> {
    const { adminProfileId, ...adminData } = createAdminDto;

    const profile = await this.adminProfileRepository.findOneBy({
      id: adminProfileId,
    });
    if (!profile) {
      throw new NotFoundException('Admin profile not found');
    }

    adminData.password = await Bcrypt.hash(adminData.password, 10);
    const admin = this.adminRepository.create({
      ...adminData,
      profile,
    });

    const createdAdmin = await this.adminRepository.save(admin);

    const audit = await createAudit<Admin>(
      request,
      createdAdmin,
      'Admin created',
      'Admin table affected',
    );
    this.auditLogRepository.save(audit);

    return createdAdmin;
  }

  findAll(name?: string) {
    if (name) {
      return this.adminRepository.findOne({
        where: { username: name },
        relations: ['admin_profile'],
        select: ['username', 'email', 'is_superadmin']
      });
    }

    return this.adminRepository.find({
      select: ['username', 'email', 'is_superadmin']
    });
  }

  findOne(id: number) {
    return this.adminRepository.findOneBy({ admin_id: id });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto, request: Request) {
    const updatedAdmin = await this.adminRepository.update(id, updateAdminDto);
    const audit = await createAudit<UpdateResult>(
      request,
      updatedAdmin,
      'Updated user',
      'Admin table affected',
    );
    this.auditLogRepository.save(audit);

    return updatedAdmin;
  }

  async remove(id: number, request: Request) {
    const deletedUser = await this.adminRepository.delete(id);
    const audit = await createAudit<number>(
      request,
      id,
      'Admin removed',
      'Admin table affected',
    );
    this.auditLogRepository.save(audit);

    return deletedUser;
  }
}
