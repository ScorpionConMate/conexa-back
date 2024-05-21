import { SetMetadata } from "@nestjs/common";
import { Role as RoleDef } from "src/modules/users/entities/user.entity";

export const Role = (arg: keyof typeof RoleDef) => SetMetadata("role", arg);
