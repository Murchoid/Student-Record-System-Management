import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateAuditLogDto {
  @ApiProperty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsDate()
  timestamp: Date;

  @ApiProperty()
  @IsString()
  entity_affected: string;

  @ApiProperty()
  @IsString()
  ip_address: string;
}
