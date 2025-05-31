import { IsDate, IsInt, IsString } from "class-validator";

export class CreateAuditLogDto {
    @IsInt()
    user_id: number;

    @IsString()
    action: string;

    @IsDate()
    timestamp: Date;

    @IsString()
    entity_affected: string;

    @IsString()
    ip_address: string;
}
