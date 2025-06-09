import { SetMetadata } from "@nestjs/common";
import { eROLE } from "src/user-profiles/entities/user-profile.entity";

export const ROLES_KEY = 'role';

export const Roles = (...roles: eROLE[])=>SetMetadata(ROLES_KEY, roles);