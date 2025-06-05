import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
import { Request } from 'express';
import { AuthsService } from './auths.service';
import { Public } from './decorators/public.decorator';
import { AtGuard, RtGuard } from './guards';

export interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    refreshToken: string;
  };
}

@Controller('auth')
export class AuthsController {
  constructor(private readonly authService: AuthsService) { }

  @Public()
  @Post('signin')
  signInLocal(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @UseGuards(AtGuard)
  @Get('signout/:id')
  signOut(@Param('id') id: string) {
    return this.authService.signOut(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  refreshTokens(
    @Query('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    if (user.sub !== id) {
      throw new UnauthorizedException('Invalid user');
    }
    return this.authService.refreshTokens(id, user.refreshToken);
  }
}