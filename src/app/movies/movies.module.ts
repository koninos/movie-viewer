import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesContainerComponent } from './movies-container/movies-container.component';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  declarations: [
    MoviesContainerComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
