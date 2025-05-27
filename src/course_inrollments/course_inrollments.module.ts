import { Module } from '@nestjs/common';
import { CourseInrollmentsService } from './course_inrollments.service';
import { CourseInrollmentsController } from './course_inrollments.controller';

@Module({
  controllers: [CourseInrollmentsController],
  providers: [CourseInrollmentsService],
})
export class CourseInrollmentsModule {}
