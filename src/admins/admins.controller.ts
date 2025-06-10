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
import { Public } from 'src/auths/decorators/public.decorator';
import { eROLE } from 'src/user-profiles/entities/user-profile.entity';
import { Roles } from 'src/auths/decorators/roles.decorator';

@Controller('api/admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Public()
  @Post('/register')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Roles(eROLE.ADMIN)
  @Get('/auths')
  findAll() {
    return this.adminsService.findAll();
  }

  @Roles(eROLE.ADMIN)
  @Get('/auths/:id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Roles(eROLE.ADMIN)
  @Patch('auths/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Roles(eROLE.ADMIN)
  @Delete('auths/:id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
