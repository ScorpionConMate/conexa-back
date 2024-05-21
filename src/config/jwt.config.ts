import { JwtSignOptions } from "@nestjs/jwt";

export const jwtConfig: JwtSignOptions = {
	secret: "secretKey",
	algorithm: "HS256",
};
