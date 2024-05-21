import { Test, TestingModule } from "@nestjs/testing";
import { SWApi } from "./swapi";

describe("Swapi", () => {
	let provider: SWApi;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SWApi],
		}).compile();

		provider = module.get<SWApi>(SWApi);
	});

	it("should be defined", () => {
		expect(provider).toBeDefined();
	});
});
