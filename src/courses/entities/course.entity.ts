import { CourseInrollment } from 'src/course_inrollments/entities/course_inrollment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Relation,
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
  status: 'Acticve' | 'Inactive';

  @ManyToOne(
    () => CourseInrollment,
    (courseInrollment) => courseInrollment.course_id,
  )
  courseInrolled: Relation<CourseInrollment>;
}
