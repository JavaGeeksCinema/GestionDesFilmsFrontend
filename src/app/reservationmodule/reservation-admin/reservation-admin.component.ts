import { Component } from '@angular/core';
import { NgFor,NgClass } from '@angular/common';
import {  OnInit } from '@angular/core';
import { ReservationService, Reservation } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-admin',
  imports: [NgFor,NgClass],
  standalone:true,
  templateUrl: './reservation-admin.component.html',
  styleUrl: './reservation-admin.component.css'
})
export class ReservationAdminComponent implements OnInit{
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
      }
    });
  }

  cancelReservation(id: number | undefined): void {
    if (id != null) {
      this.reservationService.cancelReservation(id).subscribe({
        next: () => {
          console.log(`Reservation ${id} cancelled`);
          this.loadReservations(); // Reload list or update UI as needed
        },
        error: err => {
          console.error('Error cancelling reservation:', err);
        }
      });
    }
  }

}
