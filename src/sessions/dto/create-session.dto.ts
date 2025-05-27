import { IsString, IsDate } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  session_name: string;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsString()
  status: string;
}
