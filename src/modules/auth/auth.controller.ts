import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
	Request,
	Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccessTokenGuard } from "./guards/access-token/access-token.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { RefreshTokenGuard } from "./guards/refresh-token/refresh-token.guard";
import { AuthModuleDocs } from "./docs";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	@AuthModuleDocs.ENDPOINTS.login
	async login(@Body() loginDto: CreateUserDto) {
		return this.authService.signIn(loginDto.username, loginDto.password);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post("signup")
	@AuthModuleDocs.ENDPOINTS.signup
	async signup(@Body() signupDto: CreateUserDto) {
		return this.authService.signup(signupDto.username, signupDto.password);
	}

	@UseGuards(AccessTokenGuard)
	@Get("profile")
	@AuthModuleDocs.ENDPOINTS.profile
	async profile(@Request() req) {
		return this.authService.getCurrentUser(req.user.sub);
	}

	@UseGuards(AccessTokenGuard)
	@Get("logout")
	@AuthModuleDocs.ENDPOINTS.logout
	async logout(@Request() req) {
		return this.authService.logout(req.user.sub);
	}

	@UseGuards(RefreshTokenGuard)
	@Get("refresh")
	@AuthModuleDocs.ENDPOINTS.refresh
	async refresh(@Request() req) {
		const userId = req.user.sub;
		const refreshToken = req.user.refreshToken;
		return this.authService.refreshTokens(userId, refreshToken);
	}
}
