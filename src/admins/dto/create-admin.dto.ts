import {
  IsString,
  IsDate,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  last_login: Date;

  @IsBoolean()
  is_superadmin: boolean;

  @IsInt()
  adminProfileId: number;
}
