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

	@Column({ type: "bool", default: false, select: false })
	isFromApi: boolean;

	@Column({ type: "varchar", nullable: false, length: 100, default: "" })
	shortDescription: string;

	@Column({ type: "text", nullable: false, default: "", select: false })
	longDescription: string;

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
	@JoinColumn({ name: "userId" })
	user: User;

	// User ID can be null if the movie was created by an external API
	@Column({ nullable: true, select: false })
	userId?: string;
}
