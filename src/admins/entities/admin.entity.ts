import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

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

  @OneToOne(() => AdminLog, (adminLog) => adminLog.admin)
  admin_logs: Relation<AdminLog>;

  @OneToOne(()=> AdminProfile, (adminProfile)=> adminProfile.admin_id)
  profile: Relation<AdminProfile>;
}
