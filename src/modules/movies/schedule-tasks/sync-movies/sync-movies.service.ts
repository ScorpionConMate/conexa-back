import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class SyncMoviesService {
	@Cron(CronExpression.EVERY_10_SECONDS)
	syncMoviesWithDatabase() {
		console.log("Called when the current time is 3AM");
		// Sync movies here
	}
}
