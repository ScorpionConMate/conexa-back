export interface Swapi {}

export interface SearchResultSWApi<T> {
	count: number;
	next: number;
	previous: number;
	results: T;
}

export interface SwapiMovie {
	/** The title of this film */
	title: string;

	/** The episode number of this film. */
	episode_id: number;

	/** The name of the director of this film. */
	director: string;

	/** The name(s) of the producer(s) of this film. Comma separated. */
	producer: string;

	/** The ISO 8601 date format of film release at original creator country. */
	release_date: Date;

	/** the ISO 8601 date format of the time that this resource was edited. */
	edited: string;

	opening_crawl: string;
}
