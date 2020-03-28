import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MoviesContainerComponent } from './movies-container/movies-container.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from './movies.service';

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
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    MoviesService,
    { provide: 'API_KEY', useValue: '9198fa6d9a9713bc6b03ee9582525917' }
  ]
})
export class MoviesModule { }
