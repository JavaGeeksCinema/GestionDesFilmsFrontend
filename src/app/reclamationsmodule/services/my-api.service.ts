import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  private baseUrl = 'http://localhost:8082'; // Spring Boot endpoint
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/objets/all`);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/objets/create`, data);
  }


  postData_objets(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/objets/create`, data, { headers });
  }

  postData_reclamation(data: any,objet: any): Observable<any> {
    console.log(data)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/reclamations/create/${objet}`,data, { headers });
  }
  postData_Commentaire(data: any): Observable<any> {
    console.log(data)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/commentaires/create`,data,{ headers });
  }


  getIssueTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/objets/allobjects`);
  }


  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reclamations/all`);
  }
  getAllReclamationsStatus(id_rec:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reclamations/allstatus/${id_rec}`);
  }

  getReclamationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reclamations/${id}`);
  }

  postData_ReplyComment(message: string, reclamationId: number): Observable<any> {
    const body = { description: message };
    return this.http.post<any>(`${this.baseUrl}/commentaires/create/${reclamationId}`, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  resolveReclamation(reclamationId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/reclamations/resolve/${reclamationId}`, {});
  }

  // Add more API methods here
}
