import { Injectable } from '@nestjs/common';
import { CreateCourseInrollmentDto } from './dto/create-course_inrollment.dto';
import { UpdateCourseInrollmentDto } from './dto/update-course_inrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseInrollment } from './entities/course_inrollment.entity';
import { Repository } from 'typeorm';
import { CourseInrollmentsModule } from './course_inrollments.module';

@Injectable()
export class CourseInrollmentsService {
  constructor(
    @InjectRepository(CourseInrollment)
    private readonly courseInrollmentRepository: Repository<CourseInrollmentsModule>,
  ) {}

  create(createCourseInrollmentDto: CreateCourseInrollmentDto) {
    return this.courseInrollmentRepository.save(createCourseInrollmentDto);
  }

  findAll() {
    return this.courseInrollmentRepository.find();
  }

  findOne(id: number) {
    return this.courseInrollmentRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updateCourseInrollmentDto: UpdateCourseInrollmentDto) {
    return this.courseInrollmentRepository.update(
      id,
      updateCourseInrollmentDto,
    );
  }

  remove(id: number) {
    return this.courseInrollmentRepository.delete(id);
  }
}
