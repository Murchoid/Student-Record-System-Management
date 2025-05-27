import { Injectable } from '@nestjs/common';
import { CreateCourseInrollmentDto } from './dto/create-course_inrollment.dto';
import { UpdateCourseInrollmentDto } from './dto/update-course_inrollment.dto';

@Injectable()
export class CourseInrollmentsService {
  create(createCourseInrollmentDto: CreateCourseInrollmentDto) {
    return 'This action adds a new courseInrollment';
  }

  findAll() {
    return `This action returns all courseInrollments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseInrollment`;
  }

  update(id: number, updateCourseInrollmentDto: UpdateCourseInrollmentDto) {
    return `This action updates a #${id} courseInrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseInrollment`;
  }
}
