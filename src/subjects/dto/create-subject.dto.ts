import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  subject_name: string;

  @IsInt()
  course_id: number;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsInt()
  credits: number;
}
