import { Component, OnInit } from '@angular/core';
import {MovieService} from "../services/movie.service";
import {GenreService} from "../services/genres.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-gridmovies',
  templateUrl: './gridmovies.component.html',
  styleUrls: ['./gridmovies.component.css']
})
export class GridmoviesComponent implements OnInit {
  private genresList:any;

  constructor(protected moviesService : MovieService , private genresService : GenreService) { }

  listmovies:any
  filteredMovies:any
  searchTerm: string = '';
  movieForm!: FormGroup;
  ngOnInit(): void {
    this.getallmovies()
  }
  getallmovies ()
  {
    this.moviesService.getAllMovies().subscribe( {
      next :  (data)=> {
        this.listmovies=data;
        this.filteredMovies = data;
      }
    });
  }

  getgenres ()
  {
    this.genresService.getAllGenres().subscribe( {
      next :  (data)=> {
        this.genresList=data
      }
    });
  }
  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredMovies = this.listmovies;
    } else {
      this.filteredMovies = this.listmovies.filter((movie: { title: string; }) =>
        movie.title.toLowerCase().includes(term)
      );
    }
  }

}
