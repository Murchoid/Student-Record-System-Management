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
import { Roles } from 'src/auths/decorators/roles.decorator';
import { eROLE } from './entities/user-profile.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Profile')
@Controller('user')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Public()
  @Post('profile')
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfilesService.create(createUserProfileDto);
  }

  @Roles(eROLE.ADMIN)
  @Get('profile')
  findAll() {
    return this.userProfilesService.findAll();
  }

  @Roles(eROLE.ADMIN)
  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    return this.userProfilesService.findOne(+id);
  }

  @Roles(eROLE.ADMIN)
  @Patch('profile/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userProfilesService.update(+id, updateUserProfileDto);
  }

  @Roles(eROLE.ADMIN)
  @Delete('profile/:id')
  remove(@Param('id') id: string) {
    return this.userProfilesService.remove(+id);
  }
}
