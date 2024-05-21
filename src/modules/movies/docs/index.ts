import { Docs } from "src/shared/interfaces/docs";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { MoviesController } from "../movies.controller";
import { applyDecorators } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Movie } from "../entities/movie.entity";
import { ForbiddenError, UnauthorizedError } from "src/shared/app-errors";
import { v4 } from "uuid";
import { IsDateString } from "class-validator";

export const MoviesModuleDocs: Docs<CreateMovieDto, MoviesController> = {
	PARAMS: {
		title: {
			API_DEFINITIONS: applyDecorators(
				ApiProperty({
					description: "The movie's title",
					example: "Shutter Island",
				}),
			),
			VALIDATIONS: applyDecorators(),
		},
		director: {
			API_DEFINITIONS: applyDecorators(
				ApiProperty({
					description: "The movie's director",
					example: "Martin Scorsese",
					default: "Martin Scorsese",
				}),
			),
			VALIDATIONS: applyDecorators(),
		},
		producer: {
			API_DEFINITIONS: applyDecorators(
				ApiProperty({
					description:
						"The movie's producer/producers. Separate multiple producers with comma",
					example: "Martin Scorsese, Mike Medavoy",
				}),
			),
			VALIDATIONS: applyDecorators(),
		},
		releaseDate: {
			API_DEFINITIONS: applyDecorators(
				ApiProperty({
					description: "The movie's release date in ISO format (YYYY-MM-DD)",
					example: "2010-02-10",
				}),
			),
			VALIDATIONS: applyDecorators(
				IsDateString(
					{ strict: true },
					{
						message: "releaseDate must be a valid date string",
					},
				),
			),
		},
	},
	ENDPOINTS: {
		create: applyDecorators(
			ApiOperation({
				summary: "Create a movie",
				description: "Create a new movie. Only admins can create movies.",
			}),
			ApiBearerAuth(),
			ApiUnauthorizedResponse({ type: UnauthorizedError }),
			ApiCreatedResponse({
				description: "The movie has been successfully created.",
				type: CreateMovieDto,
				schema: {
					example: {
						id: v4(),
						title: "Shutter Island",
						director: "Martin Scorsese",
						producer: "Martin Scorsese, Mike Medavoy",
						releaseDate: "2010-02-10",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				},
			}),
			ApiForbiddenResponse({
				description: "You don't have permission to access this resource",
				type: ForbiddenError,
			}),
			ApiTags("Movies"),
		),
		findAll: applyDecorators(
			ApiOperation({
				summary: "Find all movies",
				description:
					"Find all movies in the database. No authentication required.",
			}),
			ApiOkResponse({
				description: "The movies have been successfully retrieved.",
				type: [CreateMovieDto],
			}),
			ApiTags("Movies"),
		),
		findOne: applyDecorators(),
		update: applyDecorators(),
		remove: applyDecorators(),
	},
};
