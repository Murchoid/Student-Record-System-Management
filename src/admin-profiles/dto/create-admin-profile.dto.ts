import { IsString, IsInt } from 'class-validator';

export class CreateAdminProfileDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone_number: string;

  @IsString()
  address: string;

  @IsString()
  profile_picture: string;
}
