import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';

@Module({
  imports: [
    AdminsModule,
    TypeOrmModule.forFeature([Admin, UserProfile, AuditLog]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
