import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Relation
} from 'typeorm';
import { Admin } from 'src/admins/entities/admin.entity';

@Entity()
export class AdminLog {
  @PrimaryGeneratedColumn()
  login_id: number;

  @Column()
  login_time: Date;

  @Column()
  logout_time: Date;

  @OneToMany(() => Admin, (admin) => admin.admin_logs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  admin: Relation<Admin>;
}
