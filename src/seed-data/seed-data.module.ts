import { Module } from '@nestjs/common';
import { SeedDataService } from './seed-data.service';
import { SeedDataController } from './seed-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admin, AdminProfile])],
  controllers: [SeedDataController],
  providers: [SeedDataService],
})
export class SeedDataModule {}
