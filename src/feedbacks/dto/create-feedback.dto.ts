import { IsInt, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsInt()
  subject_id: number;

  @ApiProperty()
  @IsString()
  feedback: string;

  @ApiProperty()
  @IsInt()
  rating: number;

  @ApiProperty()
  @IsDate()
  timestamp: Date;
}
