import { Controller, Post, Body, Req } from '@nestjs/common';
import { PasswordChangesService } from './password-changes.service';
import { CreatePasswordChangeDto } from './dto/create-password-change.dto';
import { Roles } from 'src/auths/decorators/roles.decorator';
import { eROLE } from 'src/user-profiles/entities/user-profile.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JWTPayload } from 'src/auths/strategies';

interface IUserRequest extends Request {
  user?: JWTPayload;
}

@ApiBearerAuth()
@ApiTags('Password Changes')
@Controller('password-changes')
export class PasswordChangesController {
  constructor(
    private readonly passwordChangesService: PasswordChangesService,
  ) {}

  @Post('send-otp')
  sendOtp(@Req() request: IUserRequest) {
    return this.passwordChangesService.sendOtp(request);
  }

  @Roles(eROLE.ADMIN, eROLE.STUDENT)
  @Post()
  async create(
    @Body() createPasswordChangeDto: CreatePasswordChangeDto,
    @Req() request: IUserRequest
  ) {
    return await this.passwordChangesService.create(createPasswordChangeDto, request);
  }
}
