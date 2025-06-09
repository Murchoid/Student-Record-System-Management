import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { Public } from 'src/auths/decorators/public.decorator';

@Controller('api/user')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Public()
  @Post('profile')
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfilesService.create(createUserProfileDto);
  }

  @Get('profile')
  findAll() {
    return this.userProfilesService.findAll();
  }

  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    return this.userProfilesService.findOne(+id);
  }

  @Patch('profile/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userProfilesService.update(+id, updateUserProfileDto);
  }

  @Delete('profile/:id')
  remove(@Param('id') id: string) {
    return this.userProfilesService.remove(+id);
  }
}
