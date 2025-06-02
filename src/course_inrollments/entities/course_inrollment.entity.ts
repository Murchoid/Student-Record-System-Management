import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';

@Entity()
export class CourseInrollment {
  @PrimaryGeneratedColumn()
  enrollment_id: number;

  @ManyToOne(() => Student, (student) => student.courseInrolled)
  @JoinColumn()
  student_id: Relation<Student>;

  @ManyToOne(() => Course, (course) => course.courseInrolled)
  @JoinColumn()
  course: Relation<Course>;

  @Column()
  enroll_date: Date;

  @Column({ nullable: true })
  grade: string;

  @Column()
  status: string;
}
