import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Roles } from 'src/auths/decorators/roles.decorator';
import { eROLE } from 'src/user-profiles/entities/user-profile.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Roles(eROLE.SADMIN, eROLE.ADMIN)
  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Roles(eROLE.SADMIN, eROLE.ADMIN)
  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Roles(eROLE.SADMIN, eROLE.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Roles(eROLE.SADMIN, eROLE.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Roles(eROLE.SADMIN, eROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
