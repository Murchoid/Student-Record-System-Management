import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import * as otpGenerator from 'otp-generator';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {

  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>
){}

  create(createOtpDto: CreateOtpDto) {
    
    
    return this.otpRepository.save(createOtpDto);
  }

  findAll() {
    return this.otpRepository.find();
  }


  findOne(id: number) {
    return this.otpRepository.findOne({
      where:{id}
    });
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return this.otpRepository.update(id, updateOtpDto);
  }

  remove(id: number) {
    return this.otpRepository.delete(id);
  }
}
