import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from "rxjs/operators";
import { IMovie, IMoviesResult } from '../movies.inteface';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  public selectedMovie: IMovie;
  public moviesResult$: Observable<IMoviesResult>;

  public doShowSearchList: boolean = false;
  private searchTerm = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  @Output() movieSelected: EventEmitter<IMovie> = new EventEmitter();

  @ViewChild('searchBox') searchBox;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesResult$ = this.searchTerm.pipe(
      // wait 300ms after each keystroke
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.moviesService.searchMovies(term))
    )
  }

  ngAfterViewInit() {
    this.moviesService.getSelectedMovie()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((movie: IMovie) => {
        this.selectedMovie = movie;
        this.doShowSearchList = false;
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public search(term: string): void {
    this.searchTerm.next(term);
    this.doShowSearchList = true;
  }

  public selectMovie(movie: IMovie): void {
    this.movieSelected.emit(movie);
    this.moviesService.setSelectedMovie(movie);

    if (movie) {
      this.resetSearchBoxValue();
    }
  }

  public trackBySearchMovies(index: number, movie: IMovie): number {
    return movie.id;
  }

  private resetSearchBoxValue(): void {
    this.searchBox.nativeElement.value = '';
  }

}