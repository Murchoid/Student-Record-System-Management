import { IsInt, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePasswordChangeDto {
  @ApiProperty()
  @IsInt()
  admin_id: number;

  @ApiProperty()
  @IsString()
  old_password: string;

  @ApiProperty()
  @IsString()
  new_password: string;

  @ApiProperty()
  @IsDate()
  change_date: Date;
}
