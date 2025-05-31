import { Module } from '@nestjs/common';
import { AuditLogsService } from './audit_logs.service';
import { AuditLogsController } from './audit_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [AuditLogsController],
  providers: [AuditLogsService],
})
export class AuditLogsModule {}
