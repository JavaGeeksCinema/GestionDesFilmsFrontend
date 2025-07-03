import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GenreService} from "../services/genres.service";
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  private createdMovie: any;
  private createdMovieId: any;

  constructor( private movieService : MovieService , private genresService : GenreService ,  private formBuilder :FormBuilder ,    private router : Router) { }

  movieForm!: FormGroup;
  selectedFile: File | null = null;
  imageFile!: File;
  imagePreviewUrl: string | null = null;
  genresList : any

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      acteurs: [''],
      releaseDate: [''],
      duration: [0],
      rating: [0],
      trailerUrl :[''],
      genreIds: [[]]
    });
    this.getgenres();
  }

  getgenres ()
  {
    this.genresService.getAllGenres().subscribe( {
      next :  (data)=> {
        this.genresList=data
  }
    });
  }

  add() {
    const formValue = this.movieForm.value;
    formValue.genreIds = formValue.genreIds.map((id: any) => String(id));

    console.log("form envoyé au backend :", formValue);

    this.movieService.addMovie(formValue).subscribe({
      next: (movie: any) => {
        // movie est l'objet renvoyé par le backend
        this.createdMovie = movie;
        this.createdMovieId = movie.id;
        console.log('Objet créé :', movie);
        alert('Film ajouté avec succès !');
        // tu peux maintenant passer à l'upload d'image
      },
      error: (e) => {
        console.error("Erreur lors de l'ajout :", e);
        alert("Erreur lors de l'ajout du film");
      }
    });
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.imageFile = input.files[0];
      // apercu local
      this.imagePreviewUrl = URL.createObjectURL(this.imageFile);
    }
  }

  onUploadImage() {
    if (!this.imageFile) return;
    this.movieService.uploadMovieImage( this.createdMovieId , this.imageFile).subscribe({
      next: fileId => {
        // Une fois uploadé, on nettoie l’aperçu et on recharge l’URL définitive
        this.imagePreviewUrl = null;
      },
      error: err => console.error('Upload failed', err)
    });
  }



}
