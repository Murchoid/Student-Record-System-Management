import { IsString, IsDate, IsBoolean, IsInt } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsDate()
  last_login: Date;

  @IsBoolean()
  is_superadmin: boolean;
}
