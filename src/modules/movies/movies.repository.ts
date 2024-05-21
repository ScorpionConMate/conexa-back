import { Injectable } from "@nestjs/common";
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
}
