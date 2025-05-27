import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminLogsModule } from './admin-logs/admin-logs.module';
import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ReportsModule } from './reports/reports.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { SessionsModule } from './sessions/sessions.module';
import { AdminsModule } from './admins/admins.module';
import { CourseInrollmentsModule } from './course_inrollments/course_inrollments.module';
import { PasswordChangesModule } from './password-changes/password-changes.module';
import { AdminProfilesModule } from './admin-profiles/admin-profiles.module';

@Module({
  imports: [
    AdminLogsModule,
    CoursesModule,
    SubjectsModule,
    ReportsModule,
    FeedbacksModule,
    SessionsModule,
    AdminsModule,
    CourseInrollmentsModule,
    PasswordChangesModule,
    AdminProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
