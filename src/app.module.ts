import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AdminLogsModule } from './admin-logs/admin-logs.module';
import { CoursesModule } from './subjects/courses/courses.module';
import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ReportsModule } from './reports/reports.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { SessionsModule } from './sessions/sessions.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [AdminModule, AdminLogsModule, CoursesModule, SubjectsModule, ReportsModule, FeedbacksModule, SessionsModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
