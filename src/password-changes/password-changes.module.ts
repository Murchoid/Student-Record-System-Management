import { Module } from '@nestjs/common';
import { PasswordChangesService } from './password-changes.service';
import { PasswordChangesController } from './password-changes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordChange } from './entities/password-change.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordChange])],
  controllers: [PasswordChangesController],
  providers: [PasswordChangesService],
})
export class PasswordChangesModule {}
