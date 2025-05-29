import { Injectable } from '@nestjs/common';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminProfile } from './entities/admin-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminProfilesService {

  constructor(
    @InjectRepository(AdminProfile)
    private adminProfileRepository: Repository<AdminProfile>

  ){}

  create(createAdminProfileDto: CreateAdminProfileDto) {
      return this.adminProfileRepository.save(createAdminProfileDto);
  }

  findAll() {
    return `This action returns all adminProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminProfile`;
  }

  update(id: number, updateAdminProfileDto: UpdateAdminProfileDto) {
    return `This action updates a #${id} adminProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminProfile`;
  }
}
