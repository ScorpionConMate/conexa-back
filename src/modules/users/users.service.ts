import { HttpException, Injectable } from "@nestjs/common";
import { hash } from "argon2";
import { v4 as uuid } from "uuid";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
	constructor(private usersRepository: UsersRepository) {}

	async findOne(username: string): Promise<User | undefined> {
		return this.usersRepository.findOneByUserName(username);
	}

	async findOneById(id: string): Promise<User | undefined> {
		return this.usersRepository.findOneBy({ id });
	}

	async update(id: string, data: Partial<User>) {
		const user = this.usersRepository.update(id, data);
		return user;
	}

	async updateRefreshToken(id: string, refreshToken: string | undefined) {
		await this.usersRepository.update(id, { refreshToken });
	}

	async findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	async create(data: { username: string; password: string }) {
		const user = await this.usersRepository.findOneByUserName(data.username);
		console.log({ user });
		if (user)
			throw new HttpException(
				{
					message: "User already exists",
					code: "USER_ALREADY_EXISTS",
				},
				409,
			);

		const password = await hash(data.password);

		const newUser = this.usersRepository.create({
			username: data.username,
			password,
		});
		await this.usersRepository.save(newUser);
		return newUser;
	}
}
