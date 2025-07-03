import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {GridmoviesComponent} from "./gridmovies/gridmovies.component";
import {AddmovieComponent} from "./addmovie/addmovie.component";
import {ListmoviesComponent} from "./listmovies/listmovies.component";
import {MoviepageComponent} from "./moviepage/moviepage.component";
import {ListgenresComponent} from "./listgenres/listgenres.component";

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'addmovie', component: AddmovieComponent },
  { path: 'listmovies', component: ListmoviesComponent },
  { path: 'gridmovies', component: GridmoviesComponent },
  { path: 'movie/:id', component: MoviepageComponent },
  { path: 'listgenres', component: ListgenresComponent },
  // <- Modifié ici
  { path: '**', component: GridmoviesComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
