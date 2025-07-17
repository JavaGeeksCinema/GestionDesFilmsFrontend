import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReservationService, Reservation } from '../services/reservation.service';
import { NgFor, NgClass, CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';
@Component({
  imports: [CommonModule],
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  standalone: true,
  styleUrls: ['./reservation-confirmation.component.css']
})
export class ReservationConfirmationComponent implements OnInit {

  reservation?: Reservation;
  reservationId: number | null = null;

  constructor(
    private router: Router ,
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

ngOnInit(): void {
  console.log('Current URL:', this.router.url); // This will give you "/reservation_confirmed/1"

  this.route.paramMap
    .pipe(take(1))
    .subscribe(params => {
      const idParam = params.get('id');
      if (idParam && !isNaN(Number(idParam))) {
        this.reservationId = Number(idParam);
        this.getReservation(this.reservationId);
      } else {
        console.warn('No valid reservation id in the URL. Skipping reservation fetch.');
      }
    });
}

  getReservation(id: number): void {
    this.reservationService.getReservationById(id).subscribe({
      next: (data) => {
        console.log('Fetched reservation data:', data);
        this.reservation = data;
      },
      error: (err) => {
        console.error('Error fetching reservation:', err);
      }
    });
  }
}
