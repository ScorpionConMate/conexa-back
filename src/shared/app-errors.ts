import { ApiProperty } from "@nestjs/swagger";

export class BaseErrorResponse {
	@ApiProperty({ example: "Invalid credentials." })
	message: string | string[];
	@ApiProperty({ example: "INVALID_CREDENTIALS" })
	code: string;
	@ApiProperty({ example: 401 })
	statusCode: number;
}

export class ValidationRequestError {
	@ApiProperty({
		example: [
			{
				property: "password",
				message:
					"Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.",
			},
		],
	})
	message: {
		property: string;
		message: string;
	}[];
	@ApiProperty({ example: "VALIDATION_ERROR" })
	code: string;
	@ApiProperty({ example: 400 })
	statusCode: number;
}

export class UnauthorizedError extends BaseErrorResponse {
	@ApiProperty({ example: "Unauthorized." })
	message: string;
	@ApiProperty({ example: "UNAUTHORIZED" })
	code: string;
	@ApiProperty({ example: 401 })
	statusCode: number;
}

// USER_ALREADY_EXISTS
export class UserAlreadyExistsError extends BaseErrorResponse {
	@ApiProperty({ example: "User already exists." })
	message: string;
	@ApiProperty({ example: "USER_ALREADY_EXISTS" })
	code: string;
	@ApiProperty({ example: 409 })
	statusCode: number;
}

export class ForbiddenError extends BaseErrorResponse {
	@ApiProperty({
		example: "You don't have permission to access this resource.",
	})
	message: string;
	@ApiProperty({ example: "FORBIDDEN_RESOURCE" })
	code: string;
	@ApiProperty({ example: 403 })
	statusCode: number;
}
