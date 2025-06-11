import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    otp: string;

    @Column({nullable: false})
    user_id: number;

    @Column()
    timestamp: Date;
}
