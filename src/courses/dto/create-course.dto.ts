import { IsString, IsDate, IsInt } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  course_name: string;

  @IsString()
  course_code: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsInt()
  credits: number;

  @IsString()
  description: string;

  @IsString()
  status: string;
}
