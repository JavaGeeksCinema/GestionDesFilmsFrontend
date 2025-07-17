import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface Reservation {
  id?: number;
  customerId: number;
  seatId: number;
  seanceId: number;
  movieId: number;
  numberOfTickets: number;
  reservationTime?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8888/api/reservations'; // Your Spring Boot backend

  constructor(private http: HttpClient) {}

  // Create a reservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  // Get all reservations
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  // Get reservation by ID
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  // Cancel reservation by ID
  cancelReservation(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {});
  }
}

