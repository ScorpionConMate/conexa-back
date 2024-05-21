import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { Movie } from "./entities/movie.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class MoviesRepository extends Repository<Movie> {
	constructor(private dataSource: DataSource) {
		super(Movie, dataSource.createEntityManager());
	}

	publicMovies() {
		return this.find({ loadEagerRelations: false });
	}

	publicMovie(id: string) {
		return this.findOne({
			where: { id },
			loadEagerRelations: false,
			select: [
				"id",
				"title",
				"director",
				"producer",
				"releaseDate",
				"shortDescription",
				"longDescription",
				"createdAt",
				"updatedAt",
			],
		});
	}

	async delete(id: string) {
		const movie = await this.findOne({
			where: { id },
			select: ["id", "isFromApi"],
		});

		if (!movie) {
			throw new NotFoundException({
				message: "Movie not found",
				code: "MOVIE_NOT_FOUND",
			});
		}

		if (movie.isFromApi) {
			throw new BadRequestException({
				message: "You can't delete a movie that is from an external API",
				code: "CANNOT_DELETE_EXTERNAL_MOVIE",
			});
		}
		return this.softDelete(id);
	}

	async updateMovie(id: string, movie: Partial<Movie>) {
		const movieToUpdate = await this.findOne({
			where: { id },
			loadEagerRelations: false,
			select: ["id", "isFromApi"],
		});
		if (!movieToUpdate) {
			throw new NotFoundException({
				message: "Movie not found",
				code: "MOVIE_NOT_FOUND",
				statusCode: 404,
			});
		}

		if (movieToUpdate.isFromApi) {
			throw new BadRequestException({
				message: "You can't update a movie that is from an external API",
				code: "CANNOT_UPDATE_EXTERNAL_MOVIE",
				statusCode: 400,
			});
		}

		return this.save({ ...movieToUpdate, ...movie });
	}

	deleteApiMovies() {
		console.log("Deleting all movies from API");
		return this.createQueryBuilder()
			.where("isFromApi = :isFromApi", { isFromApi: true })
			.softDelete()
			.execute();
	}
}
