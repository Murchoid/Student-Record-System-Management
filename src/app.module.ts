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
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StudentsModule } from './students/students.module';
import { SeedDataModule } from './seed-data/seed-data.module';
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthsModule } from './auths/auths.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auths/guards';

@Module({
  imports: [
    UserProfilesModule,
    AdminLogsModule,
    CoursesModule,
    SubjectsModule,
    ReportsModule,
    FeedbacksModule,
    SessionsModule,
    AdminsModule,
    CourseInrollmentsModule,
    PasswordChangesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: '.env'
    }),
    DatabaseModule,
    StudentsModule,
    SeedDataModule,
    AuditLogsModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) => ({
        ttl: 60000,
        stores: [
          createKeyv(configService.getOrThrow<string>('REDIS_URL')),
        ],
      }),
    }),
    AuthsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    {
      provide: APP_GUARD,
      useClass: AtGuard, 
    }
  ],
})
export class AppModule {}
