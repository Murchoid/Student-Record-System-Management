import { Max, Min } from 'class-validator';
import { Subject } from 'src/subjects/entities/subject.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  feedback_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Subject, (subject) => subject.feedback,{
    cascade: true,
    onDelete: 'CASCADE'
  })
  subject: Relation<Subject>;

  @Column()
  feedback: string;

  @Column()
  @Min(1)
  @Max(5)
  rating: number;

  @CreateDateColumn()
  timestamp: Date;
}
