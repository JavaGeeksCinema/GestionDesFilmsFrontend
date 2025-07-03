import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl = 'http://localhost:8082/genres';

  constructor(private http: HttpClient) { }

  // Récupérer tous les genres
  getAllGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // Ajouter un genre (facultatif)
  addGenre(genre: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, genre);
  }

  // Supprimer un genre (facultatif)
  deleteGenre(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  getGenresByMovieId(movieId: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/getmovie/${movieId}`);
  }
}
