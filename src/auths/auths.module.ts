import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy, RfStrategy } from './strategies';
import { Admin } from 'src/admins/entities/admin.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';
import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';
import { NodemailerController } from 'src/nodemailer/nodemailer.controller';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Admin, UserProfile, AuditLog, AdminLog]),
    JwtModule.register({
      global: true,
    }),
    PassportModule,
  ],
  providers: [AuthsService, AtStrategy, RfStrategy, NodemailerController,NodemailerService],
  controllers: [AuthsController],
})
export class AuthsModule {}
