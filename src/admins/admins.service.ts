import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';

@Injectable()
export class AdminsService {

  constructor(
    @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    @InjectRepository(AdminProfile)
    private adminProfileRepository: Repository<AdminProfile>
      ){}

  async create(createAdminDto: CreateAdminDto) {
    const adminProfile = await this.adminProfileRepository.findOne({
      where:{id: createAdminDto.adminProfileId}
    })

    if(!adminProfile){
      throw new NotFoundException( `Admin profile with ID ${createAdminDto.adminProfileId} not found`)
    }

    return this.adminRepository.save(createAdminDto);

  }

  findAll(name ?: string) {
    if(name){
      return this.adminRepository.findOne({
        where: {username: name}
      })
    }

    return this.adminRepository.find({
      // relations: ['admin_logs']
    })
  }

  findOne(id: number) {
    return this.adminRepository.findOneBy({admin_id: id});
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepository.delete(id);
  }
}
