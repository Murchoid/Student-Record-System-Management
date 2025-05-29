import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';
import { AdminLogsModule } from 'src/admin-logs/admin-logs.module';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(AdminProfile)
    private adminProfileRepository: Repository<AdminProfile>,
    @InjectRepository(AdminLog)
    private adminLogRepository: Repository<AdminLogsModule>,
  ) {}

 async create(createAdminDto: CreateAdminDto): Promise<Admin> {
  const { adminProfileId, ...adminData } = createAdminDto;

  const profile = await this.adminProfileRepository.findOneBy({ id: adminProfileId });
  if (!profile) {
    throw new NotFoundException('Admin profile not found');
  }

  const admin = this.adminRepository.create({
    ...adminData,
    profile,
  });

  return this.adminRepository.save(admin);
}


  findAll(name?: string) {
    if (name) {
      return this.adminRepository.findOne({
        where: { username: name },
        relations:["admin_profile"]
      });
    }

    return this.adminRepository.find();
  }

  findOne(id: number) {
    return this.adminRepository.findOneBy({ admin_id: id });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepository.delete(id);
  }
}
