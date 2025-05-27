import { IsInt, IsString, IsDate } from 'class-validator';

export class CreatePasswordChangeDto {
  @IsInt()
  admin_id: number;

  @IsString()
  old_password: string;

  @IsString()
  new_password: string;

  @IsDate()
  change_date: Date;
}
