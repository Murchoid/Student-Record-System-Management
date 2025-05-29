import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminLogsService } from './admin-logs.service';
import { CreateAdminLogDto } from './dto/create-admin-log.dto';
import { UpdateAdminLogDto } from './dto/update-admin-log.dto';

@Controller('api/admin')
export class AdminLogsController {
  constructor(private readonly adminLogsService: AdminLogsService) {}

  @Post('logs')
  create(@Body() createAdminLogDto: CreateAdminLogDto) {
    return this.adminLogsService.create(createAdminLogDto);
  }

  @Get('logs')
  findAll() {
    return this.adminLogsService.findAll();
  }

  @Get('logs/:id')
  findOne(@Param('id') id: string) {
    return this.adminLogsService.findOne(+id);
  }

  @Patch('logs/:id')
  update(
    @Param('id') id: string,
    @Body() updateAdminLogDto: UpdateAdminLogDto,
  ) {
    return this.adminLogsService.update(+id, updateAdminLogDto);
  }

  @Delete('logs/:id')
  remove(@Param('id') id: string) {
    return this.adminLogsService.remove(+id);
  }
}
