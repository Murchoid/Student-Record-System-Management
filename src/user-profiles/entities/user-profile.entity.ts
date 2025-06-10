import { Admin } from 'src/admins/entities/admin.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum eROLE{
  STUDENT='student',
  ADMIN='admin',
  SADMIN='super admin'
}

@Entity()
export class UserProfile {
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

  @Column()
  role: eROLE;
}
