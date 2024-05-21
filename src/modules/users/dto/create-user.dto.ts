import { UsersModuleDocs } from "../docs";

export class CreateUserDto {
	@UsersModuleDocs.PARAMS.username.API_DEFINITIONS
	@UsersModuleDocs.PARAMS.username.VALIDATIONS
	username: string;

	@UsersModuleDocs.PARAMS.password.API_DEFINITIONS
	@UsersModuleDocs.PARAMS.password.VALIDATIONS
	password: string;
}
