import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { Movie } from '../movies.inteface';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss']
})
export class MoviesContainerComponent implements OnInit, OnDestroy {

  public movies: Movie[];

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
}
