import { CourseInrollment } from 'src/course_inrollments/entities/course_inrollment.entity';
import { Report } from 'src/reports/entities/report.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Relation,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column()
  course_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  credits: number;

  @Column()
  description: string;

  @Column()
  status: string;

  @OneToMany(
    () => CourseInrollment,
    (courseInrollment) => courseInrollment.course,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  courseInrolled: Relation<CourseInrollment[]>;

  @OneToMany(() => Subject, (subject) => subject.course)
  @JoinColumn()
  subject: Relation<Subject[]>;

  @OneToOne(() => Report)
  @JoinColumn()
  report: Relation<Report>;
}
