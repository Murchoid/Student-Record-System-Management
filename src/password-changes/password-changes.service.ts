import { CreatePasswordChangeDto } from './dto/create-password-change.dto';
import { PasswordChange } from './entities/password-change.entity';
import { PasswordChangesModule } from './password-changes.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';
import { createAudit } from 'src/audit_logs/helper/createAudit.helper';
import { Request } from 'express';
import { OtpValidator } from 'src/otp/helper/otpValidator';
import { Otp } from 'src/otp/entities/otp.entity';
import { OtpController } from 'src/otp/otp.controller';
import { NodemailerController } from 'src/nodemailer/nodemailer.controller';
import { JWTPayload } from 'src/auths/strategies';
import { Injectable } from '@nestjs/common';
import { AdminsController } from 'src/admins/admins.controller';

interface IUserRequest extends Request {
  user?: JWTPayload;
}

@Injectable()
export class PasswordChangesService {
  constructor(
    @InjectRepository(PasswordChange)
    private readonly passwordChangeRepository: Repository<PasswordChangesModule>,
    @InjectRepository(AuditLog)
    private readonly auditRepository: Repository<AuditLog>,
    private otpValidator: OtpValidator,
    private otpController: OtpController,
    private nodemailerController: NodemailerController,
    private adminController: AdminsController
  ) {}

  sendOtp(request: IUserRequest) {
    const thisOtp = new Otp();
    thisOtp.otp = this.otpValidator.generateOtp();
    thisOtp.timestamp = new Date();
    thisOtp.user_id = request.user!.sub;
    this.otpController.create(thisOtp);
    const { email } = request.user!;
    this.nodemailerController.sendOtpEmail(thisOtp.otp, email);
    return { message: 'An email was sent to you with a temporary password use it to reset yours'};
  }

  async create(
    createPasswordChangeDto: CreatePasswordChangeDto,
    request: IUserRequest
  ) {
    const confirmOtp = await this.otpController.findOne(
      createPasswordChangeDto.old_password,
    );
    if (confirmOtp){
       await this.createAuditAndSavePassword(request, createPasswordChangeDto);
       await this.otpController.remove(String(confirmOtp.id));
       return { message: "Password changed successfully!" }; 
    }
    return { message: "OTP not valid or expired" }; 
  }

  private async createAuditAndSavePassword(request: Request, createPasswordChangeDto: CreatePasswordChangeDto){
    const pass = await this.passwordChangeRepository.save(
        createPasswordChangeDto,
      );
      const audit = await createAudit(
        request,
        pass,
        'Password changed',
        'Password table changed',
      );
      this.auditRepository.save(audit);
      return "password changed succesfully!";
  }
}
