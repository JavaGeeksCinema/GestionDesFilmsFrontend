import { Component, OnInit } from '@angular/core';
import {MovieService} from "../services/movie.service";
import {Router} from "@angular/router";
import {GenreService} from "../services/genres.service";

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})
export class ListmoviesComponent implements OnInit {

  filteredMovies:any
  searchTerm: string = '';

  constructor(private moviesService: MovieService , private router : Router ,private genresService : GenreService) {
  }


  expandedMovieId: string | null = null;
  showEditModal = false;
  selectedMovie: any = null;


  isEditPopupOpen = false;
  movieToEdit: any;
  listmovies: any[] = [];
  genresMap: { [movieId: string]: any[] } = {};

  ngOnInit(): void {
    this.getallmovies()

  }

  getallmovies() {
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.listmovies = data;
        this.filteredMovies = data;
        console.log('Films:', this.listmovies);

        // Appeler getgenres pour chaque film
        this.listmovies.forEach(movie => {
          this.getgenres(movie.id);
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des films :', err);
      }
    });
  }

  getgenres(movieId: string) {
    this.moviesService. getGenresByMovieId(movieId).subscribe({
      next: (data) => {
        this.genresMap[movieId] = data;
        console.log(`Genres pour le film ${movieId}:`, data);
      },
      error: (err) => {
        console.error(`Erreur lors de la récupération des genres pour le film ${movieId} :`, err);
      }
    });
  }


  openDescriptionModal(description: string) {
    alert(description); // ou afficher un vrai modal Angular Material
  }
  toggleDescription(movieId: string) {
    if (this.expandedMovieId === movieId) {
      this.expandedMovieId = null;  // Replier si déjà ouvert
    } else {
      this.expandedMovieId = movieId; // Déployer celui cliqué
    }
  }

  deleteUser(id: string): void {
    this.moviesService.deleteMovie(id).subscribe({
      next: () => {
        // Après suppression, recharger la liste des films
        this.moviesService.getAllMovies().subscribe({
          next: (data) => {
            this.listmovies = data;
            this.router.navigate(['/listmovies']);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des films :', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du film :', err);
      }
    });
  }
  openEditPopup(movie: any) {
    // Cloner pour ne pas modifier directement l'objet dans la liste
    this.movieToEdit = { ...movie };
    this.isEditPopupOpen = true;
    this.selectedMovie=movie;
  }

  closeEditPopup() {
    this.isEditPopupOpen = false;
    this.movieToEdit = null;
  }


  updateMovie() {
    if (!this.selectedMovie) return;

    this.moviesService.updateMovie(this.selectedMovie.id, this.selectedMovie).subscribe({
      next: (updatedMovie) => {
        const index = this.listmovies.findIndex((m: { id: any; }) => m.id === updatedMovie.id);
        if (index !== -1) {
          this.listmovies[index] = updatedMovie;
        }
        this.closeEditPopup();
        alert('Film mis à jour avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        alert('Erreur lors de la mise à jour');
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
