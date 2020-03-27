import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { IMovie, MovieDetails, IMovieDetails } from '../movies.inteface';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss']
})
export class MoviesContainerComponent implements OnInit, OnDestroy {

  public movies: IMovie[];
  public selectedMovie: IMovieDetails;

  private unsubscribe$ = new Subject<void>();

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(res => {
        this.movies = res.results;
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public trackByMovies(index: number, movie) {
    return movie.id;
  }

  public selectMovie(movie: IMovie): void {
    const m = new MovieDetails(movie);
    m.poster_path = this.moviesService.getPosterUrl(movie.poster_path);

    this.selectedMovie = m;
  }
}
