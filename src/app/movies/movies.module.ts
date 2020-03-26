import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MoviesContainerComponent } from './movies-container/movies-container.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from './movies.service';


@NgModule({
  declarations: [
    MoviesContainerComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule
  ],
  providers: [
    MoviesService
  ]
})
export class MoviesModule { }
