import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Public } from 'src/auths/decorators/public.decorator';
import { eROLE } from 'src/user-profiles/entities/user-profile.entity';
import { Roles } from 'src/auths/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Public()
  @Post('/register')
  create(@Body() createAdminDto: CreateAdminDto, @Req() request: Request) {
    return this.adminsService.create(createAdminDto, request);
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
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @Req() request: Request,
  ) {
    return this.adminsService.update(+id, updateAdminDto, request);
  }

  @Roles(eROLE.ADMIN)
  @Delete('auths/:id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.adminsService.remove(+id, request);
  }
}
