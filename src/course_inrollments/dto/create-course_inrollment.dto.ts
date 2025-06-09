import { IsString, IsInt, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseInrollmentDto {
  @ApiProperty()
  @IsInt()
  student_id: number;

  @ApiProperty()
  @IsInt()
  course_id: number;

  @ApiProperty()
  @IsDate()
  enroll_date: Date;

  @ApiProperty()
  @IsString()
  grade: string;

  @ApiProperty()
  @IsString()
  status: string;
}
