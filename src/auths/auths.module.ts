import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy, RfStrategy } from './strategies';
import { Admin } from 'src/admins/entities/admin.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Admin, UserProfile]),
    JwtModule.register({
      global: true,
    }), 
    PassportModule, 
  ],
  providers: [AuthsService, AtStrategy, RfStrategy],
  controllers: [AuthsController],
})
export class AuthsModule { }