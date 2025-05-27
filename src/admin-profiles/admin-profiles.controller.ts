import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminProfilesService } from './admin-profiles.service';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';

@Controller('api/admin')
export class AdminProfilesController {
  constructor(private readonly adminProfilesService: AdminProfilesService) {}

  @Post('profile')
  create(@Body() createAdminProfileDto: CreateAdminProfileDto) {
    return this.adminProfilesService.create(createAdminProfileDto);
  }

  @Get('profile')
  findAll() {
    return this.adminProfilesService.findAll();
  }

  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    return this.adminProfilesService.findOne(+id);
  }

  @Patch('profile/:id')
  update(
    @Param('id') id: string,
    @Body() updateAdminProfileDto: UpdateAdminProfileDto,
  ) {
    return this.adminProfilesService.update(+id, updateAdminProfileDto);
  }

  @Delete('profile/:id')
  remove(@Param('id') id: string) {
    return this.adminProfilesService.remove(+id);
  }
}
