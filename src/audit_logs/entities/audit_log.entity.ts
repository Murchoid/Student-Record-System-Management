import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuditLog {
    @PrimaryGeneratedColumn()
    log_id: number;

    @Column()
    user_id: number;

    @Column()
    action: string;

    @Column()
    timestamp: Date;

    @Column()
    entity_affected: string;

    @Column()
    ip_address: string;
}
