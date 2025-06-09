import { IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  report_data: string;

  @ApiProperty()
  @IsDate()
  report_date: Date;
}
