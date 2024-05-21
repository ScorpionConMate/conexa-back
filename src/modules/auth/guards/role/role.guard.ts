import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	matchRole(role: string, userRole: string): boolean {
		return role === userRole;
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const role = this.reflector.get<string>("role", context.getHandler());
		if (!role) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user as User;
		if (this.matchRole(role, user.role)) {
			return true;
		} else {
			throw new ForbiddenException({
				message: "You don't have permission to access this resource",
				code: "FORBIDDEN_RESOURCE",
			});
		}
	}
}
