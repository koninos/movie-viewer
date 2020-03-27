import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { IMoviesResult } from './movies.inteface';
import { PosterSize } from './movies.enum';
import { environment } from '../../environments/environment';

@Injectable()
export class MoviesService {

  readonly API_URL: string = environment.baseUrl;
  readonly API_POSTER_URL: string = environment.apiPosterUrl;

  constructor(
    @Inject('API_KEY') private API_KEY,
    private http: HttpClient
  ) {}

  public getMovies(): Observable<IMoviesResult> {
    return this.http.get<IMoviesResult>(this.getPopularMoviesURI())
      .pipe(
        catchError(this.handleError('fetchMovies'))
      );
  }

  public getPosterUrl(posterPath: string, posterSize: PosterSize = PosterSize.w185): string {
    return `${this.API_POSTER_URL}${posterSize}${posterPath}`;
  }

  private getPopularMoviesURI(): string {
    let params = '';

    if (environment.production) {
      params = `?api_key=${this.API_KEY}&sort_by=popularity.desc&page=1`;
    }

    return `${this.API_URL}${params}`;
  }

  private handleError(operation: string) {
    return err => {
        console.error(`Error: coudn't ` + operation);
        return of({ results: [] } as IMoviesResult);
    }
  }

}
