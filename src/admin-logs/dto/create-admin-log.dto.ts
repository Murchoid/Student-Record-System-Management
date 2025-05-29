import { IsDate, IsInt } from 'class-validator';

export class CreateAdminLogDto {
  @IsDate()
  login_time: Date;

  @IsDate()
  logout_time: Date;

}