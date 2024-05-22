import { JwtSignOptions } from "@nestjs/jwt";
import "dotenv/config";

export const jwtConfig: JwtSignOptions = {
	secret: process.env.JWT_SECRET || "default",
	algorithm: "HS256",
};
