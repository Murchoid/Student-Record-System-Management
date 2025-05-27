import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateCourseInrollmentDto {
  @IsInt()
  student_id: number;

  @IsInt()
  course_id: number;

  @IsDate()
  enroll_date: Date;

  @IsString()
  grade: string;

  @IsString()
  status: string;
}
