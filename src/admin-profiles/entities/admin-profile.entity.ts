import { Admin } from 'src/admins/entities/admin.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
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

  @OneToOne(() => Admin, (admin) => admin.profile,{
    cascade: true,
    onDelete: 'CASCADE'
  })
  admin: Relation<Admin>;
}
