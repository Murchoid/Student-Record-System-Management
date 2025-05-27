import { IsString, IsInt } from 'class-validator';

export class CreateAdminProfileDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsInt()
  phone_number: number;

  @IsString()
  address: string;

  @IsString()
  profile_picture: string;
}
