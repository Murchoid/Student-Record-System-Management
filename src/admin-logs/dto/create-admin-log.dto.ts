import { IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminLogDto {
  @ApiProperty()
  @IsDate()
  @IsOptional()
  login_time: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  logout_time: Date;
}
