import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository extends Repository<User> {
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}

	findOneByUserName(username: string) {
		return this.findOne({
			select: ["id", "password", "refreshToken", "role", "username"],
			where: { username },
		});
	}

	findOneById(id: string) {
		return this.findOne({
			select: ["id", "password", "refreshToken", "role", "username"],
			where: { id },
		});
	}
}
