import { Module } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { SWApi } from "./swapi/swapi";
import { SyncMoviesService } from "./schedule-tasks/sync-movies/sync-movies.service";
import { MoviesRepository } from "./movies.repository";

@Module({
	imports: [],
	controllers: [MoviesController],
	providers: [MoviesService, SWApi, SyncMoviesService, MoviesRepository],
})
export class MoviesModule {}
