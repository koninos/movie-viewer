import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { IMovie, IMovieDetails, MovieDetails } from '../movies.inteface';
import { MoviesService } from '../movies.service';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss']
})
export class MoviesContainerComponent implements OnInit, OnDestroy {

  public movies: IMovie[];
  public selectedMovie: IMovieDetails;
  public currentPage: number;
  public totalPages: number = 1;
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;

  private unsubscribe$ = new Subject<void>();

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getSelectedMovie()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((movie: IMovie) => {
        this.selectedMovie = this.getMovieDetails(movie);
      })

    // Get the first page from movies results
    this.getPopularMovies(1);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public trackByMovies(index: number, movie) {
    return movie.id;
  }

  public selectMovie(movie: IMovie): void {
    this.moviesService.setSelectedMovie(movie);
  }

  public movieSelectedOnSearch(movie: IMovie) {
    this.selectMovie(movie);
  }

  public getPopularMovies(page: number = 1): void {
    if (page > 0 && page <= this.totalPages) {
      this.moviesService.getPopularMovies(page)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(res => {
        this.movies = res.results;
        this.currentPage = res.page;
        this.totalPages = res.total_pages;
      })
    }
  }

  private getMovieDetails(movie: IMovie): IMovieDetails {
    let m = null;

    if (movie) {
      m = new MovieDetails(movie);
      m.poster_path = this.moviesService.getPosterUrl(movie.poster_path);
    }
    return m;
  }
}