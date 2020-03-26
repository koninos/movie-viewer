import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { MoviesResult } from './movies.inteface';

@Injectable()
export class MoviesService {

  readonly API_URL: string = 'https://api.themoviedb.org/3/discover/movie';
  readonly API_KEY: string = '9198fa6d9a9713bc6b03ee9582525917';

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<MoviesResult> {
    return this.http.get<MoviesResult>(this.getPopularMoviesURI())
      .pipe(
        catchError(this.handleError('fetchMovies'))
      );
  }

  private getPopularMoviesURI(): string {
    return `${this.API_URL}?api_key=${this.API_KEY}&sort_by=popularity.desc&page=1`;
  }

  private handleError(operation: string) {
    return err => {
        console.error(`Error: coudn't ` + operation);
        return of({ results: [] } as MoviesResult);
    }
  }

}
