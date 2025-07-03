import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'http://localhost:8082/movies';

  constructor(private http: HttpClient) { }

  // Ajouter un film
  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, movie);
  }

  // Supprimer un film
  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Récupérer tous les films
  getAllMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // Récupérer un film par ID
  getMovieById(id: string | undefined): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }

  // Rechercher un film par titre
  searchMoviesByTitle(title: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search/${title}`);
  }

  // Mettre à jour un film
  updateMovie(id: string, movie: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, movie);
  }

  getGenresByMovieId(movieId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getgenres/${movieId}`);
  }
  uploadMovieImage(movieId: string, file: File): Observable<string> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/${movieId}/image`, form);
  }

  getMovieImageUrl(movieId: string): string {
    // Route qui sert l’image : Angular l’utilise comme <img src="...">
    return `${this.baseUrl}/${movieId}/image`;
  }

}
