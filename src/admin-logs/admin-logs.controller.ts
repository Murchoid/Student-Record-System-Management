import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminLogsService } from './admin-logs.service';
import { CreateAdminLogDto } from './dto/create-admin-log.dto';
import { UpdateAdminLogDto } from './dto/update-admin-log.dto';
import { Roles } from 'src/auths/decorators/roles.decorator';
import { eROLE } from 'src/user-profiles/entities/user-profile.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Admin Logs')
@Controller('admin')
export class AdminLogsController {
  constructor(private readonly adminLogsService: AdminLogsService) {}

  @Post('logs')
  create(@Body() createAdminLogDto: CreateAdminLogDto) {
    return this.adminLogsService.create(createAdminLogDto);
  }

  @Roles(eROLE.SADMIN)
  @Get('logs')
  findAll() {
    return this.adminLogsService.findAll();
  }

  @Roles(eROLE.SADMIN)
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

  @Roles(eROLE.SADMIN)
  @Delete('logs/:id')
  remove(@Param('id') id: string) {
    return this.adminLogsService.remove(+id);
  }
}
