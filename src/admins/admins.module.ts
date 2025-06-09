import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';

@Module({
  imports: [
    AdminsModule,
    TypeOrmModule.forFeature([Admin, UserProfile, AdminLog]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
