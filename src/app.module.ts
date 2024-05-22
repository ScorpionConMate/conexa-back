import { Module } from "@nestjs/common";
import { SharedModule } from "./modules/shared/shared.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
import { ConfigModule } from "@nestjs/config";
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		SharedModule,
		ScheduleModule.forRoot(),
		TypeOrmModule.forRoot(databaseConfig),
	],
})
export class AppModule {}
