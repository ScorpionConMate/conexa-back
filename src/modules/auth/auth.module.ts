import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "src/config/jwt.config";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			secret: jwtConfig.secret,
			global: true,
			signOptions: { expiresIn: jwtConfig.expiresIn || "60s" },
		}),
	],
	providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
