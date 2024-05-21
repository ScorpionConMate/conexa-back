import { applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
	PickType,
} from "@nestjs/swagger";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import {
	UnauthorizedError,
	UserAlreadyExistsError,
	ValidationRequestError,
} from "src/shared/app-errors";
import { AuthController } from "../auth.controller";
import { Docs } from "src/shared/interfaces/docs";

class LoggedInResponse {
	@ApiProperty({ example: "eyJ ..." })
	accessToken: string;
	@ApiProperty({ example: "eyJ ..." })
	refreshToken: string;
}

class LoggedInUser {
	@ApiProperty({ example: "cebd247e-f213-4f16-84b6-bb705053e28c" })
	id: string;
	@ApiProperty({ example: "user_name1" })
	username: string;
	@ApiProperty({ example: "user" })
	role: string;
	@ApiProperty({ example: "2024-05-21T01:15:51.489Z" })
	createdAt: Date;
	@ApiProperty({ example: "2024-05-21T01:19:52.112Z" })
	updatedAt: Date;
}

export const AuthModuleDocs: Docs<any, AuthController> = {
	ENDPOINTS: {
		login: applyDecorators(
			ApiOkResponse({
				description: "User successfully logged in.",
				type: LoggedInResponse,
			}),
			ApiBadRequestResponse({
				description: "Validation error. Invalid credentials.",
				type: ValidationRequestError,
			}),
			ApiUnauthorizedResponse({ type: UnauthorizedError }),
			ApiBody({ type: CreateUserDto }),
			ApiOperation({
				summary: "Login",
				description:
					"Login to the application. If successful, the user is logged in.",
			}),
			ApiTags("Auth"),
		),
		signup: applyDecorators(
			ApiOkResponse({
				description: "User successfully signed up.",
				type: LoggedInResponse,
			}),
			ApiBadRequestResponse({
				description: "Validation error. Invalid credentials.",
				type: ValidationRequestError,
			}),
			ApiResponse({
				status: 409,
				description: "User already exists.",
				type: UserAlreadyExistsError,
			}),
			ApiBody({ type: CreateUserDto }),
			ApiOperation({
				summary: "Signup",
				description:
					"Create a new user account. If successful, the user is logged in.",
			}),
			ApiTags("Auth"),
		),
		profile: applyDecorators(
			ApiBearerAuth(),
			ApiOkResponse({
				description: "User profile.",
				type: LoggedInUser,
			}),
			ApiUnauthorizedResponse({
				type: PickType(UnauthorizedError, ["message", "statusCode"]),
			}),
			ApiOperation({
				summary: "Profile",
				description: "Get the current user profile.",
			}),
			ApiTags("Auth"),
		),
		logout: applyDecorators(
			ApiBearerAuth(),
			ApiOkResponse({
				description: "User successfully logged out.",
			}),
			ApiUnauthorizedResponse({
				type: PickType(UnauthorizedError, ["message", "statusCode"]),
			}),
			ApiOperation({
				summary: "Logout",
				description: "Logout the current user.",
			}),
			ApiTags("Auth"),
		),
		refresh: applyDecorators(
			ApiBearerAuth(),
			ApiOkResponse({
				description: "Tokens successfully refreshed.",
				type: LoggedInResponse,
			}),
			ApiUnauthorizedResponse({
				type: PickType(UnauthorizedError, ["message", "statusCode"]),
			}),
			ApiOperation({
				summary: "Refresh",
				description: "Refresh the current user tokens to extend the session.",
			}),
			ApiTags("Auth"),
		),
	},
};
