import { IsString, IsDate, IsInt } from "class-validator";

export class CreateOtpDto {
    @IsString()
    otp: string;

    @IsDate()
    timestamp: Date;

    @IsInt()
    user_id: number;
}
