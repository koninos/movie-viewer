import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MoviesContainerComponent } from './movies-container/movies-container.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from './movies.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieSearchComponent } from './movie-search/movie-search.component';

@NgModule({
  declarations: [
    MoviesContainerComponent,
    MovieDetailsComponent,
    MovieSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MoviesRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    MoviesService,
    { provide: 'API_KEY', useValue: '9198fa6d9a9713bc6b03ee9582525917' }
  ]
})
export class MoviesModule { }
