import {
  IsString,
  IsDate,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsDate()
  last_login: Date;

  @ApiProperty()
  @IsBoolean()
  is_superadmin: boolean;

  @ApiProperty()
  @IsInt()
  adminProfileId: number;
}
