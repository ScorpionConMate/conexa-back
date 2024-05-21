import { MoviesModuleDocs } from '../docs';

export class CreateMovieDto {
	@MoviesModuleDocs.PARAMS.title.API_DEFINITIONS
	@MoviesModuleDocs.PARAMS.title.VALIDATIONS
	title: string;

	@MoviesModuleDocs.PARAMS.director.API_DEFINITIONS
	@MoviesModuleDocs.PARAMS.director.VALIDATIONS
	director: string;

	@MoviesModuleDocs.PARAMS.producer.API_DEFINITIONS
	@MoviesModuleDocs.PARAMS.producer.VALIDATIONS
	producer: string;

	@MoviesModuleDocs.PARAMS.releaseDate.API_DEFINITIONS
	@MoviesModuleDocs.PARAMS.releaseDate.VALIDATIONS
	releaseDate: Date;
}
