import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { eROLE } from "src/user-profiles/entities/user-profile.entity";

export class CreateUserProfileDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  phone_number: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  profile_picture: string;

  @ApiProperty()
  @IsEnum(eROLE, {
    message: "The role must be an enum of : student, admin"
  })
  role: eROLE;
}
