import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesContainerComponent } from './movies-container/movies-container.component';

const routes: Routes = [
  { path: '', component: MoviesContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
