import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  session_id: number;

  @Column()
  session_name: string;

  @CreateDateColumn()
  start_date: Date;

  @UpdateDateColumn()
  end_date: Date;
}
