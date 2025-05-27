import { Module } from '@nestjs/common';
import { PasswordChangesService } from './password-changes.service';
import { PasswordChangesController } from './password-changes.controller';

@Module({
  controllers: [PasswordChangesController],
  providers: [PasswordChangesService],
})
export class PasswordChangesModule {}
