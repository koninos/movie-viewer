import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MovieDetails } from '../movies.inteface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {

  @Input() movie: MovieDetails;

}