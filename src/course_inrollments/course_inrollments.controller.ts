import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseInrollmentsService } from './course_inrollments.service';
import { CreateCourseInrollmentDto } from './dto/create-course_inrollment.dto';
import { UpdateCourseInrollmentDto } from './dto/update-course_inrollment.dto';
import { Roles } from 'src/auths/decorators/roles.decorator';
import { eROLE } from 'src/user-profiles/entities/user-profile.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Course Inrollment')
@Controller('course-inrollments')
export class CourseInrollmentsController {
  constructor(
    private readonly courseInrollmentsService: CourseInrollmentsService,
  ) {}

  @Roles(eROLE.ADMIN)
  @Post()
  create(@Body() createCourseInrollmentDto: CreateCourseInrollmentDto) {
    return this.courseInrollmentsService.create(createCourseInrollmentDto);
  }

  @Roles(eROLE.ADMIN)
  @Get()
  findAll() {
    return this.courseInrollmentsService.findAll();
  }

  @Roles(eROLE.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseInrollmentsService.findOne(+id);
  }

  @Roles(eROLE.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseInrollmentDto: UpdateCourseInrollmentDto,
  ) {
    return this.courseInrollmentsService.update(+id, updateCourseInrollmentDto);
  }

  @Roles(eROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseInrollmentsService.remove(+id);
  }
}
