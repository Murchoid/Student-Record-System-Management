import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  subject_name: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  @IsInt()
  credits: number;
}
