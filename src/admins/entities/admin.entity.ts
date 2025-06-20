import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { PasswordChange } from 'src/password-changes/entities/password-change.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  last_login: Date;

  @Column()
  is_superadmin: boolean;

  @OneToMany(() => AdminLog, (adminLog) => adminLog.admin)
  @JoinColumn()
  admin_logs: Relation<AdminLog[]>;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: Relation<UserProfile>;

  @OneToMany(() => PasswordChange, (passwordChange) => passwordChange.admin_id)
  @JoinColumn()
  password_change: Relation<PasswordChange[]>;

  @Column({ type: 'text', nullable: true, default: null })
  hashedRefreshToken: string | null;
}
