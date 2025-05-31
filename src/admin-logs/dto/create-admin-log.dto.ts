import { IsDate, IsOptional } from 'class-validator';

export class CreateAdminLogDto {
  @IsDate()
  @IsOptional()
  login_time: Date;

  @IsDate()
  @IsOptional()
  logout_time: Date;
}
