import { Injectable } from '@nestjs/common';
import { CreatePasswordChangeDto } from './dto/create-password-change.dto';
import { UpdatePasswordChangeDto } from './dto/update-password-change.dto';
import { PasswordChange } from './entities/password-change.entity';
import { PasswordChangesModule } from './password-changes.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';
import { createAudit } from 'src/audit_logs/helper/createAudit.helper';
import { Request } from 'express';

@Injectable()
export class PasswordChangesService {
  constructor(
    @InjectRepository(PasswordChange)
    private readonly passwordChangeRepository: Repository<PasswordChangesModule>,
    @InjectRepository(AuditLog)
    private readonly auditRepository: Repository<AuditLog>
  ) {}

  async create(createPasswordChangeDto: CreatePasswordChangeDto, request: Request) {
    const pass = await this.passwordChangeRepository.save(createPasswordChangeDto); 
    const audit = await createAudit(request, pass, "Password changed", "Password table changed");
    this.auditRepository.save(audit);
    return pass;
  }

  findAll() {
    return this.passwordChangeRepository.find();
  }

  findOne(id: number) {
    return this.passwordChangeRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updatePasswordChangeDto: UpdatePasswordChangeDto) {
    return this.passwordChangeRepository.update(id, updatePasswordChangeDto);
  }

  remove(id: number) {
    return this.passwordChangeRepository.delete(id);
  }
}
