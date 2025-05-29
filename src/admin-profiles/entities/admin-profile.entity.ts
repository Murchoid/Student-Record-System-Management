import { Admin } from 'src/admins/entities/admin.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

@Entity()
export class AdminProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column()
  profile_picture: string;

  @OneToOne(() => Admin, (admin) => admin.profile)
  admin: Relation<Admin>;
}
