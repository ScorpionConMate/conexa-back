import {
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { jwtConfig } from "src/config/jwt.config";
import { hash, verify } from "argon2";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async signIn(
		username: string,
		pass: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const user = await this.usersService.findOne(username);
		if (!user) {
			throw new UnauthorizedException({
				message: "User not found",
				code: "USER_NOT_FOUND",
				statusCode: 401,
			});
		}
		const passwordMatches = await verify(user.password, pass);

		if (!passwordMatches) {
			throw new UnauthorizedException({
				message: "Invalid credentials",
				code: "INVALID_CREDENTIALS",
				statusCode: 401,
			});
		}
		const tokens = await this.getTokens(user.id, user);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}

	async signup(username: string, password: string) {
		const newUser = await this.usersService.create({
			username,
			password,
		});
		const tokens = await this.getTokens(newUser.id, newUser);
		await this.updateRefreshToken(newUser.id, tokens.refreshToken);
		return tokens;
	}

	async logout(userId: string): Promise<void> {
		this.usersService.updateRefreshToken(userId, undefined);
	}

	async updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = await this.hashData(refreshToken);
		await this.usersService.update(userId, {
			refreshToken: hashedRefreshToken,
		});
	}

	async getTokens(userId: string, user: User) {
		const jwtPayload = {
			sub: userId,
			username: user.username,
			role: user.role,
		};
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{ ...jwtPayload },
				{
					secret: jwtConfig.secret,
					expiresIn: "15m",
				},
			),
			this.jwtService.signAsync(
				{ ...jwtPayload },
				{
					secret: jwtConfig.secret,
					expiresIn: "7d",
				},
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	hashData(data: string) {
		return hash(data);
	}

	async refreshTokens(userId: string, token: string) {
		const user = await this.usersService.findOneById(userId);
		if (!user || !user.refreshToken)
			throw new ForbiddenException({
				message: "Access denied",
				code: "ACCESS_DENIED",
			});

		const refreshTokenMatch = await verify(user.refreshToken, token);

		if (!refreshTokenMatch)
			throw new ForbiddenException({
				message: "Access denied",
				code: "ACCESS_DENIED",
			});

		const tokens = await this.getTokens(user.id, user);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}

	async getCurrentUser(userId: string) {
		return this.usersService.findOneById(userId);
	}
}
