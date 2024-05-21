import { Movie } from 'src/modules/movies/entities/movie.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export const Role = {
	ADMIN: "admin",
	USER: "user",
};

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		unique: true,
		length: 15,
		nullable: false,
	})
	username: string;

	@Column({
		nullable: false,
		type: "varchar",
		select: false,
	})
	password: string;

	@Column({
		type: "enum",
		enum: Role,
		default: Role.USER,
		nullable: false,
	})
	role: keyof typeof Role;

	@Column({
		nullable: true,
		type: "varchar",
		select: false,
	})
	refreshToken?: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// Relationship with movies created by the user
	@OneToMany(() => Movie, (movie) => movie.user, { eager: false })
	movies: Movie[];
}
