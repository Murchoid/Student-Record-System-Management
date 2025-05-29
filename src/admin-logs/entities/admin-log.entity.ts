import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Relation,
  ManyToOne,
} from 'typeorm';
import { Admin } from 'src/admins/entities/admin.entity';

@Entity()
export class AdminLog {
  @PrimaryGeneratedColumn()
  login_id: number;

  @Column('date', { nullable: true })
  login_time: Date;

  @Column('date', { nullable: true })
  logout_time: Date;

  @ManyToOne(() => Admin, (admin)=> admin.admin_logs)
  @JoinColumn()
  admin: Relation<Admin>;
}
