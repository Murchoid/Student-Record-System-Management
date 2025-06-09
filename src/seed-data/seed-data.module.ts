import { Module } from '@nestjs/common';
import { SeedDataService } from './seed-data.service';
import { SeedDataController } from './seed-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Report } from 'src/reports/entities/report.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';
import { PasswordChange } from 'src/password-changes/entities/password-change.entity';
import { CourseInrollment } from 'src/course_inrollments/entities/course_inrollment.entity';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      UserProfile,
      Student,
      Course,
      Subject,
      Report,
      Feedback,
      AdminLog,
      PasswordChange,
      CourseInrollment,
      AuditLog,
    ]),
  ],
  controllers: [SeedDataController],
  providers: [SeedDataService],
})
export class SeedDataModule {}
