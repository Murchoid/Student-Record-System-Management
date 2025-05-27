import { IsDate, IsInt } from 'class-validator';

export class CreateAdminLogDto {
  @IsInt()
  admin_id: number;

  @IsDate()
  login_time: Date;

  @IsDate()
  logout_time: Date;
}
