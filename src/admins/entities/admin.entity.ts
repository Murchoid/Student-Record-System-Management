import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  last_login: Date;

  @Column()
  is_superadminn: boolean;

  @OneToOne(() => AdminLog, (adminLog) => adminLog.admin)
  admin_logs: AdminLog;
}
