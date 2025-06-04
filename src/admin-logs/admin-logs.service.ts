import { Injectable } from '@nestjs/common';
import { CreateAdminLogDto } from './dto/create-admin-log.dto';
import { UpdateAdminLogDto } from './dto/update-admin-log.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminLog } from './entities/admin-log.entity';

@Injectable()
export class AdminLogsService {
  constructor(
    @InjectRepository(AdminLog)
    private adminlogsRepository: Repository<AdminLog>,
  ) {}

  create(createAdminLogDto: CreateAdminLogDto) {
    return this.adminlogsRepository.save(createAdminLogDto);
  }

  findAll() {
    return this.adminlogsRepository.find();
  }

  findOne(id: number) {
    return this.adminlogsRepository.findOne({
      where: { login_id: id },
    });
  }

  update(id: number, updateAdminLogDto: UpdateAdminLogDto) {
    return this.adminlogsRepository.update(id, updateAdminLogDto);
  }

  remove(id: number) {
    return this.adminlogsRepository.delete(id);
  }
}
