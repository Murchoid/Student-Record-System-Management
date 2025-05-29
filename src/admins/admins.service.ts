import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {

  constructor(
    @InjectRepository(Admin)
        private adminlogsRepository: Repository<Admin>,
  ){}

  create(createAdminDto: CreateAdminDto) {
    return this.adminlogsRepository.save(createAdminDto);
  }

  findAll(name ?: string) {
    if(name){
      return this.adminlogsRepository.find({
        where: {username: name}
      })
    }

    return this.adminlogsRepository.find({
      relations: ['admin_logs']
    })
  }

  findOne(id: number) {
    return this.adminlogsRepository.findOneBy({admin_id: id});
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminlogsRepository.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminlogsRepository.delete(id);
  }
}
