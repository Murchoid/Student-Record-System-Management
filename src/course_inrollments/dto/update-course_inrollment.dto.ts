import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseInrollmentDto } from './create-course_inrollment.dto';

export class UpdateCourseInrollmentDto extends PartialType(
  CreateCourseInrollmentDto,
) {}
