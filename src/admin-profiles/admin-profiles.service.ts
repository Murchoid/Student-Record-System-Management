import { Injectable } from '@nestjs/common';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';

@Injectable()
export class AdminProfilesService {
  create(createAdminProfileDto: CreateAdminProfileDto) {
    return createAdminProfileDto;
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
