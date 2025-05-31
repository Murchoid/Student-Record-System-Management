import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit_log.dto';
import { UpdateAuditLogDto } from './dto/update-audit_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit_log.entity';
import { Repository } from 'typeorm';
import { AuditLogsModule } from './audit_logs.module';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLogsModule>,
  ) {}

  create(createAuditLogDto: CreateAuditLogDto) {
    return this.auditLogRepository.create(createAuditLogDto);
  }

  findAll() {
    return this.auditLogRepository.find();
  }

  findOne(id: number) {
    return this.auditLogRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updateAuditLogDto: UpdateAuditLogDto) {
    return this.auditLogRepository.update(id, updateAuditLogDto);
  }

  remove(id: number) {
    return this.auditLogRepository.delete(id);
  }
}
