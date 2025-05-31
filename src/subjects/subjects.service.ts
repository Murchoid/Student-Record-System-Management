import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from 'typeorm/persistence/Subject';
import { SubjectsModule } from './subjects.module';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<SubjectsModule>,
  ) {}

  create(createSubjectDto: CreateSubjectDto) {
    return this.subjectRepository.save(createSubjectDto);
  }

  findAll() {
    return this.subjectRepository.find();
  }

  findOne(id: number) {
    return this.subjectRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.subjectRepository.update(id, updateSubjectDto);
  }

  remove(id: number) {
    return this.subjectRepository.delete(id);
  }
}
