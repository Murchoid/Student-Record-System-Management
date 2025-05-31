import { Course } from 'src/courses/entities/course.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  suject_id: number;

  @Column()
  subject_name: string;

  @Column()
  @ManyToOne(() => Course, (course) => course.subject)
  course: Relation<Course>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  credits: number;

  @OneToMany(() => Feedback, (feedback) => feedback.subject)
  @JoinColumn()
  feedback: Relation<Feedback[]>;
}
