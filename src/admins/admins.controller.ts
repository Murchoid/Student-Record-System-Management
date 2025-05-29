import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('api/admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('/register')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get('/auths')
  findAll() {
    return this.adminsService.findAll();
  }

  @Get('/auths/:id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch('auths/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete('auths/:id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
