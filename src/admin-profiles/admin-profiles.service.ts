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
    private adminProfileRepository: Repository<AdminProfile>,
  ) {}

  create(createAdminProfileDto: CreateAdminProfileDto) {
    return this.adminProfileRepository.save(createAdminProfileDto);
  }

   findAll(name ?: string) {
    if(name){
      const userProfile = this.adminProfileRepository.find({
        where:{first_name: name}
      });
      
      return userProfile;
    }
    return this.adminProfileRepository.find();
  }

  findOne(id: number) {
    return this.adminProfileRepository.findOne({
      where:{id}
    })
  }

  update(id: number, updateAdminProfileDto: UpdateAdminProfileDto) {
    return this.adminProfileRepository.update(id, updateAdminProfileDto)
  }

  remove(id: number) {
    return this.adminProfileRepository.delete(id);
  }
}
