import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { PosterSize } from './movies.enum';
import { IMovie, IMoviesResult } from './movies.inteface';

@Injectable()
export class MoviesService {

  private selectedMovie$ = new BehaviorSubject<IMovie>(null);

  readonly API_POSTER_URL: string = environment.apiPosterUrl;

  constructor(
    @Inject('API_KEY') private API_KEY,
    private http: HttpClient
  ) {}

  public getSelectedMovie(): BehaviorSubject<IMovie> {
    return this.selectedMovie$;
  }

  public setSelectedMovie(movie: IMovie) {
    this.selectedMovie$.next(movie);
  }

  public getPopularMovies(page: number = 1): Observable<IMoviesResult> {
    return this.http.get<IMoviesResult>(`${this.getPopularMoviesURI()}&page=${page}`)
      .pipe(
        catchError(this.handleError('fetch movies'))
      );
  }

  public searchMovies(query: string): Observable<IMoviesResult> {
    return this.http.get<IMoviesResult>(this.getSearchMovieURI(query))
      .pipe(
        catchError(this.handleError('find movies'))
      );
  }

  public getPosterUrl(posterPath: string, posterSize: PosterSize = PosterSize.w185): string {
    return `${this.API_POSTER_URL}${posterSize}${posterPath}`;
  }

  public getSearchMovieURI(query: string): string {
    const params = `?api_key=${this.API_KEY}&query=${query}`;
    return `${environment.apiSearchBaseUrl}/movie${params}`;
  }

  private getPopularMoviesURI(): string {
    if (!environment.production) {
      return environment.apiDiscoverBaseUrl;
    }

    const params = `?api_key=${this.API_KEY}&sort_by=popularity.desc`;
    return `${environment.apiDiscoverBaseUrl}/movie${params}`;
  }

  private handleError(operation: string) {
    return err => {
        console.error(`Error: coudn't ` + operation);
        return of({ results: [] } as IMoviesResult);
    }
  }

}
