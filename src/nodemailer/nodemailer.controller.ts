import { Controller } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller()
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  sendEmail(/*otp: string,*/ email: string){
    this.nodemailerService.sendEmail(/*otp,*/ email);
  }
  
}
