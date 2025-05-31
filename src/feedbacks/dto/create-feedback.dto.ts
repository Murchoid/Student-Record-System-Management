import { IsInt, IsString, IsDate } from 'class-validator';

export class CreateFeedbackDto {
  @IsInt()
  user_id: number;

  @IsInt()
  subject_id: number;

  @IsString()
  feedback: string;

  @IsInt()
  rating: number;

  @IsDate()
  timestamp: Date;
}
