import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../services/movie.service";


@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {
  movieId!: string;
  movie!: any;         // Movie + on y ajoutera bientôt .genres: Genre[]

  constructor(
    private route: ActivatedRoute,
    protected movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.loadMovieAndGenres();
  }

  private loadMovieAndGenres() {
    // Charge le film
    this.movieService.getMovieById(this.movieId).subscribe({
      next: movieData => {
        this.movie = movieData;
        // Dès qu'on a le film, charge ses genres
        this.movieService.getGenresByMovieId(this.movieId).subscribe({
          next: genres => {
            // Attache directement la liste des genres au movie
            this.movie.genres = genres;
          },
          error: err => console.error('Erreur récup genres:', err)
        });
      },
      error: err => console.error('Erreur récup film:', err)
    });
  }
}
