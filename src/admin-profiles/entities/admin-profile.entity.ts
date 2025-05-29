import { Admin } from "src/admins/entities/admin.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Relation } from "typeorm";

@Entity()
export class AdminProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=> Admin, (admin)=> admin.profile,  {
    cascade: true,
    onDelete: 'CASCADE',
  })
    @JoinColumn()
    admin_id: Relation<Admin>;

    @Column()
    first_name: string;

    @Column()
    last_name: string

    @Column()
    phone_number: number;

    @Column()
    address: string;

    @Column()
    profile_picture: string;

}
