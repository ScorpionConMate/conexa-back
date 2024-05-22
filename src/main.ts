import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import helmet from "@fastify/helmet";
import { SwaggerModule } from "@nestjs/swagger";
import { openApiConfig } from "./config/openapi.config";
import { BadRequestException, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => {
				const result = errors.map((error) => ({
					property: error.property,
					message: error.constraints[Object.keys(error.constraints)[0]],
				}));
				return new BadRequestException({
					message: result,
					code: "VALIDATION_ERROR",
					statusCode: 400,
				});
			},
			stopAtFirstError: true,
		}),
	);
	app.enableCors();
	const document = SwaggerModule.createDocument(app, openApiConfig);
	SwaggerModule.setup("docs", app, document);
	await app.register(helmet);

	checkEnv();
	await app.listen(3000, "0.0.0.0");
}
bootstrap();

function checkEnv() {
	const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
		process.env;
	if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
		console.error("Missing database environment variables");
		process.exit(1);
	}

	const { SWAPI_URL } = process.env;
	if (!SWAPI_URL) {
		console.error("Missing SWAPI_URL environment variable");
		process.exit(1);
	}

	const { JWT_SECRET } = process.env;
	if (!JWT_SECRET) {
		console.error("Missing JWT_SECRET environment variable");
		process.exit(1);
	}
}
