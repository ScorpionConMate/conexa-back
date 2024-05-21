import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig: TypeOrmModuleOptions = {
	type: "postgres",
	database: "conexa-movies",
	username: "postgres",
	password: "postgres",
	host: "0.0.0.0",
	port: 5433,
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	synchronize: true,
};
