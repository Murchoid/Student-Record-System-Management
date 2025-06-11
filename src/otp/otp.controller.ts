import {
  Controller,
  Body,
  Param,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  findOne(otpValue: string) {
    return this.otpService.findByOtp(otpValue);
  }

  remove(@Param('id') id: string) {
    return this.otpService.remove(+id);
  }
}
