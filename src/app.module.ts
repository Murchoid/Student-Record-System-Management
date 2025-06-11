import { Module } from '@nestjs/common';
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
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { RolesGuard } from './auths/guards/roles.guards';
import { UserProfile } from './user-profiles/entities/user-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from './otp/otp.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';

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
        stores: [createKeyv(configService.getOrThrow<string>('REDIS_URL'))],
      }),
    }),
    AuthsModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.getOrThrow('T_TTL'),
          limit: configService.getOrThrow('T_LIMIT'),
          ignoreUserAgents: [/^curl\//],
        },
      ],
    }),
    TypeOrmModule.forFeature([UserProfile]),
    OtpModule,
    NodemailerModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
