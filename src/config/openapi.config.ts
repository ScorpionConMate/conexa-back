import { DocumentBuilder } from "@nestjs/swagger";

const description = `Conexa Movies API, you are able to create, read, update and delete movies.
You have a default database with Star Wars movies (These are inmutable).
Admins can create, update and delete movies.`;
export const openApiConfig = new DocumentBuilder()
	.setTitle("Conexa Movies API")
	.setDescription(description)
	.addBearerAuth({
		description: "JWT Token for authentication",
		type: "http",
	})
	.setVersion("1.0")
	.build();
