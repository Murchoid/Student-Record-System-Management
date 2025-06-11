import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  create(createOtpDto: CreateOtpDto) {
    return this.otpRepository.save(createOtpDto);
  }

  findByOtp(otpValue: string) {
    return this.otpRepository.findOne({
      where: { otp: otpValue },
    });
  }

  remove(id: number) {
    return this.otpRepository.delete(id);
  }
}
