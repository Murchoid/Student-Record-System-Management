import { Admin } from "src/admins/entities/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class PasswordChange {
    @PrimaryGeneratedColumn()
    change_id: number;

    @ManyToOne(()=>Admin, (admin)=>admin.password_change)
    admin_id: Relation<Admin>;

    @Column({nullable:false})
    old_password: string;

    @Column({nullable:false})
    new_password: string;
}
