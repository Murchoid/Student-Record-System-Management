import { Module } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiles.service';
import { AdminProfilesController } from './admin-profiles.controller';

@Module({
  controllers: [AdminProfilesController],
  providers: [AdminProfilesService],
})
export class AdminProfilesModule {}
