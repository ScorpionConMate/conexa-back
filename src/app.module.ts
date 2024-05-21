import { Module } from "@nestjs/common";
import { SharedModule } from "./modules/shared/shared.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
@Module({
	imports: [
		SharedModule,
		ScheduleModule.forRoot(),
		TypeOrmModule.forRoot(databaseConfig),
	],
})
export class AppModule {}
