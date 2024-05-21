import { User } from "src/modules/users/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
@Index("idx_movie_title", ["title"])
export class Movie {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		length: 100,
		nullable: false,
	})
	title: string;

	@Column({
		length: 100,
		nullable: false,
	})
	director: string;

	@Column({
		length: 100,
		nullable: false,
	})
	producer: string;

	@Column({ type: "timestamptz", nullable: false })
	releaseDate: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn({
		select: false,
	})
	deletedAt: Date;

	// Relationship with User that created the movie
	@ManyToOne(() => User, (user) => user.movies, { eager: true })
	@JoinColumn()
	user: User;
}
