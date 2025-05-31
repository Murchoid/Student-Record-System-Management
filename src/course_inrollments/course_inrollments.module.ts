import { Module } from '@nestjs/common';
import { CourseInrollmentsService } from './course_inrollments.service';
import { CourseInrollmentsController } from './course_inrollments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseInrollment } from './entities/course_inrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseInrollment])],
  controllers: [CourseInrollmentsController],
  providers: [CourseInrollmentsService],
})
export class CourseInrollmentsModule {}
