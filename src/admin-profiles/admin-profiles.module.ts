import { Module } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiles.service';
import { AdminProfilesController } from './admin-profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProfile } from './entities/admin-profile.entity';

@Module({
  imports:[AdminProfilesModule, TypeOrmModule.forFeature([AdminProfile])],
  controllers: [AdminProfilesController],
  providers: [AdminProfilesService],
})
export class AdminProfilesModule {}
