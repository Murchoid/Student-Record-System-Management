import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';

@Entity()
export class CourseInrollment {
  @PrimaryGeneratedColumn()
  enrollment_id: number;

  @OneToMany(() => Student, (student) => student.courseInrolled)
  @JoinColumn()
  student_id: Relation<Student>;

  @OneToMany(() => Course, (course) => course.courseInrolled)
  @JoinColumn()
  course_id: Relation<Course>;

  @Column()
  enroll_date: Date;

  @Column()
  grade: string;

  @Column()
  status: string;
}
