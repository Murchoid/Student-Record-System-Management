import { IsInt, IsString, IsDate } from 'class-validator';

export class CreateReportDto {
  @IsString()
  report_data: string;

  @IsDate()
  report_date: Date;
}
