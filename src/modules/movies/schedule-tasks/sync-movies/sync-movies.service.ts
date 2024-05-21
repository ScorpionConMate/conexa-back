import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SWApi } from "../../swapi/swapi";
import { MoviesService } from "../../movies.service";

@Injectable()
export class SyncMoviesService {
	constructor(
		private swapi: SWApi,
		private moviesService: MoviesService,
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_3AM)
	async syncMoviesWithDatabase() {
		const movies = await this.swapi.getMovies();
		console.log("Syncing movies with database", movies.length);
		await this.moviesService.deleteApiMovies();
		const promises = movies.map((movie) => {
			return this.moviesService.createApiMovie({
				title: movie.title,
				director: movie.director,
				producer: movie.producer,
				releaseDate: movie.release_date,
				shortDescription: movie.shortDescription,
				longDescription: movie.longDescription,
			});
		});

		const results = await Promise.allSettled(promises);

		const successful = results.filter(
			(result) => result.status === "fulfilled",
		);
		const failed = results.filter((result) => result.status === "rejected");

		console.log("Successfully synced movies", successful.length);

		if (failed.length > 0) {
			console.error("Failed to sync movies", failed.length);
		}
	}
}
