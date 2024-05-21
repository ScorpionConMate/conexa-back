import { applyDecorators } from "@nestjs/common";

export type Docs<DTO, Controller> = {
	PARAMS?: {
		[K in keyof DTO]: {
			API_DEFINITIONS: ReturnType<typeof applyDecorators>;
			VALIDATIONS: ReturnType<typeof applyDecorators>;
		};
	};
	ENDPOINTS?: {
		[K in keyof Controller]: ReturnType<typeof applyDecorators>;
	};
};
