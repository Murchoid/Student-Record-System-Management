import { CourseInrollment } from 'src/course_inrollments/entities/course_inrollment.entity';
import { Report } from 'src/reports/entities/report.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Relation,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column('date')
  dob: Date;

  @Column()
  gender: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column('date')
  enrollment_date: Date;

  @Column()
  status: 'Active' | 'Inactive';

  @Column()
  profile_picture: string;

  @ManyToOne(
    () => CourseInrollment,
    (courseInrollment) => courseInrollment.student_id,
  )
  courseInrolled: Relation<CourseInrollment>;

  @OneToOne(() => Report)
  @JoinColumn()
  report: Relation<Report>;
}
