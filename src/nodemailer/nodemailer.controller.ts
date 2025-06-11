import { Controller } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller()
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  sendOtpEmail(otp: string, email: string) {
    this.nodemailerService.sendOtpEmail(otp, email);
  }

  sendWelcomeEmail(email) {
    this.nodemailerService.sendWelcomeEmail(email);
  }
}
