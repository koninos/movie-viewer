export interface IMoviesResult {
    page: number;
    total_results: number;
    total_pages: number;
    results: IMovie[];
}

export interface IMovie {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}


export interface IMovieDetails {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
}

export class MovieDetails implements IMovieDetails {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    overview: string;

    constructor(movie: IMovie) {
        if (movie) {
            this.id = movie.id;
            this.title = movie.title;
            this.vote_average = movie.vote_average;
            this.vote_count = movie.vote_count;
            this.overview = movie.overview;
        }
    }
}