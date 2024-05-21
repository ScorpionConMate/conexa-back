import type { FastifyRequest } from "fastify";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "src/config/jwt.config";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secret,
			passReqToCallback: true,
		});
	}

	validate(req: FastifyRequest, payload: any) {
		const refreshToken = req.headers.authorization.split(" ")[1];
		return { refreshToken, ...payload };
	}
}
