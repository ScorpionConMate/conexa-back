import { Injectable } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MoviesRepository } from "./movies.repository";

@Injectable()
export class MoviesService {
	constructor(private moviesRepository: MoviesRepository) {}

	create(createMovieDto: CreateMovieDto, userId?: string) {
		const movie = this.moviesRepository.create({
			...createMovieDto,
			userId,
		});
		return this.moviesRepository.save(movie);
	}

	findAll() {
		return this.moviesRepository.publicMovies();
	}

	async findOne(id: string) {
		return this.moviesRepository.publicMovie(id);
	}

	update(id: string, updateMovieDto: UpdateMovieDto) {
		return this.moviesRepository.update(id, updateMovieDto);
	}

	remove(id: string) {
		return this.moviesRepository.delete(id);
	}

	async createApiMovie(movie: CreateMovieDto) {
		return this.moviesRepository.save({
			...movie,
			isFromApi: true,
			userId: null,
		});
	}

	async deleteApiMovies() {
		return this.moviesRepository.deleteApiMovies();
	}
}
