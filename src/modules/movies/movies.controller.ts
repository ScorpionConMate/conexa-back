import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Res,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Role } from "../auth/decorators/roles.decorator";
import { AccessTokenGuard } from "../auth/guards/access-token/access-token.guard";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { MoviesModuleDocs } from "./docs";
import { FastifyReply } from "fastify";

@Controller("movies")
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Role("ADMIN")
	@UseGuards(AccessTokenGuard, RoleGuard)
	@MoviesModuleDocs.ENDPOINTS.create
	@Post()
	create(
		@Body() createMovieDto: CreateMovieDto,
		@Res() response: FastifyReply,
	) {
		const movie = this.moviesService.create(createMovieDto);
		// return a 201 status code
		return response.status(201).send(movie);
	}

	@Get()
	@MoviesModuleDocs.ENDPOINTS.findAll
	findAll() {
		return this.moviesService.findAll();
	}

	@Role("USER")
	@UseGuards(AccessTokenGuard, RoleGuard)
	@Get(":id")
	@MoviesModuleDocs.ENDPOINTS.findOne
	findOne(@Param("id") id: string) {
		return {
			message: `Find one movie with id: ${id}`,
		};
	}

	@Role("ADMIN")
	@UseGuards(AccessTokenGuard, RoleGuard)
	@Patch(":id")
	@MoviesModuleDocs.ENDPOINTS.update
	update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
		return this.moviesService.update(+id, updateMovieDto);
	}

	@Role("ADMIN")
	@UseGuards(AccessTokenGuard, RoleGuard)
	@Delete(":id")
	@MoviesModuleDocs.ENDPOINTS.remove
	remove(@Param("id") id: string) {
		return this.moviesService.remove(+id);
	}
}
