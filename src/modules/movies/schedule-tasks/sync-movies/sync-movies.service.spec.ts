import { Test, TestingModule } from "@nestjs/testing";
import { SyncMoviesService } from "./sync-movies.service";

describe("SyncMoviesService", () => {
	let service: SyncMoviesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SyncMoviesService],
		}).compile();

		service = module.get<SyncMoviesService>(SyncMoviesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
