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

@Controller('course-inrollments')
export class CourseInrollmentsController {
  constructor(
    private readonly courseInrollmentsService: CourseInrollmentsService,
  ) {}

  @Post()
  create(@Body() createCourseInrollmentDto: CreateCourseInrollmentDto) {
    return this.courseInrollmentsService.create(createCourseInrollmentDto);
  }

  @Get()
  findAll() {
    return this.courseInrollmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseInrollmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseInrollmentDto: UpdateCourseInrollmentDto,
  ) {
    return this.courseInrollmentsService.update(+id, updateCourseInrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseInrollmentsService.remove(+id);
  }
}
