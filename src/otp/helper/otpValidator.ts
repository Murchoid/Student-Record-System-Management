import * as otpGenerator from 'otp-generator';
import { OtpController } from '../otp.controller';
import { Injectable } from '@nestjs/common';
import { Otp } from '../entities/otp.entity';

@Injectable()
export class OtpValidator {
  constructor(private otpController: OtpController) {}
  generateOtp(): string {
    const otp = otpGenerator.generate(6, { digits: true });
    return otp;
  }

  async confirmOtp(otp: Otp, user_id: number): Promise<boolean> {
    const findOtp = await this.otpController.findOne(String(otp.id));
    if (!findOtp) {
      return false;
    }
    const currentTime = new Date();

    if (findOtp.user_id == user_id) {
      if (findOtp.timestamp.getMinutes() - currentTime.getMinutes() <= 5) {
        if (findOtp.otp == otp.otp) {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  }
}
