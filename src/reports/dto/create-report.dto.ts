import { IsInt, IsString, IsDate } from 'class-validator';

export class CreateReportDto {
  @IsInt()
  student_id: number;

  @IsInt()
  course_id: number;

  @IsString()
  report_data: string;

  @IsDate()
  report_date: Date;
}
