import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config";
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
export const databaseConfig: TypeOrmModuleOptions = {
	type: "postgres",
	database: DB_DATABASE,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	host: DB_HOST,
	ssl: true,
	port: parseInt(DB_PORT),
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	// TODO: Implement migrations instead of synchronize
	synchronize: true,
};
