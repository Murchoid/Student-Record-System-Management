import { Module } from '@nestjs/common';
import { PasswordChangesService } from './password-changes.service';
import { PasswordChangesController } from './password-changes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordChange } from './entities/password-change.entity';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';
import { OtpValidator } from 'src/otp/helper/otpValidator';
import { NodemailerController } from 'src/nodemailer/nodemailer.controller';
import { OtpController } from 'src/otp/otp.controller';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { OtpService } from 'src/otp/otp.service';
import { Otp } from 'src/otp/entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordChange, AuditLog, Otp])],
  controllers: [PasswordChangesController],
  providers: [
    PasswordChangesService,
    OtpValidator,
    OtpController,
    NodemailerController,
    OtpService,
    NodemailerService,
  ],
})
export class PasswordChangesModule {}
