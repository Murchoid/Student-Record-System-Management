import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, UserProfile])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
