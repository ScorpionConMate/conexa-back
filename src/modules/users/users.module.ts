import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UsersService, UsersRepository],
	exports: [UsersService],
	controllers: [],
})
export class UsersModule {}
