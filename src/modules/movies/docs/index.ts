import { Docs } from "src/shared/interfaces/docs";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { MoviesController } from "../movies.controller";
import { applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
	BadRequestError,
	ForbiddenError,
	NotFoundError,
	UnauthorizedError,
} from "src/shared/app-errors";
import { v4 } from "uuid";
import { IsDateString, IsString, MaxLength, MinLength } from "class-validator";
const movieExample = {
	id: v4(),
	title: "Shutter Island",
	director: "Martin Scorsese",
	producer: "Martin Scorsese, Mike Medavoy",
	releaseDate: "2010-02-10",
	createdAt: new Date(),
	updatedAt: new Date(),
};
export const MoviesModuleDocs = {
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
		shortDescription: {
			API_DEFINITIONS: applyDecorators(
				ApiProperty({
					description: "A short description of the movie",
					example: "A U.S. Marshal investigates the disappearance",
				}),
			),
			VALIDATIONS: applyDecorators(
				IsString(),
				MinLength(10, {
					message: "shortDescription must be at least 10 characters long",
				}),
				MaxLength(100, {
					message: "shortDescription must be at most 100 characters long",
				}),
			),
		},
		longDescription: {
			API_DEFINITIONS: applyDecorators(
				ApiProperty({
					description: "A long description of the movie",
					example: "A U.S. Marshal investigates the disappearance of...",
				}),
			),
			VALIDATIONS: applyDecorators(
				IsString(),
				MinLength(10, {
					message: "longDescription must be at least 10 characters long",
				}),
				MaxLength(500, {
					message: "longDescription must be at most 500 characters long",
				}),
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
					example: movieExample,
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
		findOne: applyDecorators(
			ApiOperation({
				summary: "Find a movie by title",
				description:
					"Find a movie by its title. Only regular users can access this endpoint.",
			}),
			ApiOkResponse({
				description: "The movie has been successfully retrieved.",
				type: CreateMovieDto,
				schema: {
					example: movieExample,
				},
			}),
			ApiBearerAuth(),
			ApiTags("Movies"),
		),
		update: applyDecorators(
			ApiOperation({
				summary: "Update a movie",
				description: "Update a movie by its ID. Only admins can update movies.",
			}),
			ApiBearerAuth(),
			ApiUnauthorizedResponse({ type: UnauthorizedError }),
			ApiOkResponse({
				description: "The movie has been successfully updated.",
				type: CreateMovieDto,
				schema: {
					example: movieExample,
				},
			}),
			ApiForbiddenResponse({
				description: "You don't have permission to access this resource",
				type: ForbiddenError,
			}),
			ApiBadRequestResponse({
				description: "The movie could not be updated",
				type: BadRequestError,
			}),
			ApiNotFoundResponse({
				description: "The movie could not be found",
				type: NotFoundError,
			}),
			ApiTags("Movies"),
		),
		remove: applyDecorators(
			ApiOperation({
				summary: "Delete a movie",
				description: "Delete a movie by its ID. Only admins can delete movies.",
			}),
			ApiBearerAuth(),
			ApiUnauthorizedResponse({ type: UnauthorizedError }),
			ApiOkResponse({
				description: "The movie has been successfully deleted.",
				type: CreateMovieDto,
				schema: {
					example: movieExample,
				},
			}),
			ApiForbiddenResponse({
				description: "You don't have permission to access this resource",
				type: ForbiddenError,
			}),
			ApiNotFoundResponse({
				description: "The movie could not be found",
				type: NotFoundError,
			}),
			ApiTags("Movies"),
		),
	},
} satisfies Docs<CreateMovieDto, MoviesController>;
