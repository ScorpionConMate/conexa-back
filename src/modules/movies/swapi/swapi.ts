import { Injectable } from "@nestjs/common";
import { SearchResultSWApi, SwapiMovie } from "./swapi.interface";
import axios, { AxiosInstance } from "axios";
@Injectable()
export class SWApi {
	private URL = "https://swapi.dev/api/";
	private http: AxiosInstance;
	constructor() {
		this.http = axios.create({
			baseURL: this.URL,
		});
	}

	async getMovies() {
		const url = "films";
		const { data } = await this.http.get<SearchResultSWApi<SwapiMovie[]>>(url);

		return data.results.map((movie) => ({
			...movie,
			shortDescription: movie.opening_crawl.slice(0, 100),
			longDescription: movie.opening_crawl,
		}));
	}

	async getMovie(id: string) {
		const url = `films/${id}`;
		const { data } = await this.http.get<SwapiMovie>(url);
		return data;
	}
}
