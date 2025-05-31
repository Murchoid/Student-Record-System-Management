import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  report_id: number;

  @OneToOne(() => Student, (student) => student.report,{
    cascade: true,
    onDelete: 'CASCADE'
  })
  student: Relation<Student>;

  @OneToOne(() => Course, (course) => course.report,{
    cascade: true,
    onDelete: 'CASCADE'
  })
  course: Relation<Course>;

  @Column()
  report_data: string;

  @CreateDateColumn()
  report_date: Date;
}
