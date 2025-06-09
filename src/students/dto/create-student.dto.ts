import { IsDate, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
    @ApiProperty()
    @IsString()
    email: string;
  
    @ApiProperty()
    @IsDate()
    dob: Date;
  
    @ApiProperty()
    @IsString()
    gender: string;
    
    @ApiProperty()
    @IsString()
    country: string;
  
    @ApiProperty()
    @IsString()
    state: string;
  
    @ApiProperty()
    @IsString()
    city: string;
  
    @ApiProperty()
    @IsDate()
    enrollment_date: Date;
  
    @ApiProperty()
    @IsString()
    status: 'Active' | 'Inactive';

    @ApiProperty()
    @IsInt()
    studentProfileId: number;
}
