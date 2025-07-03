import { Component, OnInit } from '@angular/core';
import {MovieService} from "../services/movie.service";
import {GenreService} from "../services/genres.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-listgenres',
  templateUrl: './listgenres.component.html',
  styleUrls: ['./listgenres.component.css']
})
export class ListgenresComponent implements OnInit {

  constructor(protected moviesService : MovieService , protected genresService : GenreService , private formBuilder :FormBuilder) { }

  newGenreName: string = '';
  genresList: any;
  moviesList: any;
  genreForm!: FormGroup;// chargée au init

  ngOnInit() {
    this.genreForm = this.formBuilder.group({
      name: ['', Validators.required]

    });
    this.loadGenres();

  }

  addGenre() {
    const formValue = this.genreForm.value;
    this.genresService.addGenre(formValue).subscribe(() => {
      this.newGenreName = '';
      this.loadGenres();
    });
  }

  deleteGenre(id: string) {
    this.genresService.deleteGenre(id).subscribe(() => {
      this.loadGenres();
    });
  }

// Récupère tous les films dont l'id est dans movieIds

  loadGenres() {
    this.genresService.getAllGenres().subscribe(data => this.genresList = data);
  }




}
