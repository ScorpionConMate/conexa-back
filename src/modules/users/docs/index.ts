import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import {
	IsNotEmpty,
	MinLength,
	MaxLength,
	Matches,
	IsStrongPassword,
} from "class-validator";
import { CreateUserDto } from "../dto/create-user.dto";
import { Docs } from "src/shared/interfaces/docs";

export const UsersModuleDocs: Docs<CreateUserDto, undefined> = {
	PARAMS: {
		username: {
			API_DEFINITIONS: applyDecorators(
				ApiProperty({
					description:
						"The user's username. Must be between 5 and 15 characters long and contain only letters, numbers, underscores, and periods.",
					examples: [
						"user_name1",
						"exampleUser.2",
						"test_user.3",
						"myUsername4",
					],
				}),
			),
			VALIDATIONS: applyDecorators(
				IsNotEmpty({
					message: "Username is required",
				}),
				MinLength(5, {
					message: "Username must be between 5 and 15 characters long.",
				}),
				MaxLength(15, {
					message: "Username must be between 5 and 15 characters long.",
				}),
				Matches(/^[a-zA-Z0-9_.]{5,15}$/, {
					message:
						"Username must be between 5 and 15 characters long and contain only letters, numbers, underscores and periods.",
				}),
			),
		},
		password: {
			API_DEFINITIONS: applyDecorators(
				ApiProperty({
					description:
						"The user's password. Must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.",
					examples: [
						"Password1!",
						"Example2@",
						"Testing3#",
						"MyPass4$",
						"YourPass5%",
					],
				}),
			),
			VALIDATIONS: applyDecorators(
				IsNotEmpty({
					message: "Password is required",
				}),
				IsStrongPassword(
					{
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 1,
					},
					{
						message:
							"Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.",
					},
				),
			),
		},
	},
};
