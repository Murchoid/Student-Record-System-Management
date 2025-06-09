import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentsModule } from './students.module';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<StudentsModule>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfilesModule>
  ) {}

  async create(createStudentDto: CreateStudentDto) {

    const {studentProfileId} = createStudentDto;

    const studentProfile = await this.userProfileRepository.find({
      where: {id:studentProfileId}
    })

    if(!studentProfile){
      throw new NotFoundException('Student profile not found!');
    }

    return this.studentRepository.save(createStudentDto);
  }

  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: number) {
    return this.studentRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
}
