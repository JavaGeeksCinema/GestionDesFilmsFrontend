import {Component, OnInit} from '@angular/core';
import {Reservation, ReservationService} from "../services/reservation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-ticket',
  imports: [
    NgIf
  ],
  templateUrl: './ticket.component.html',
  standalone: true,
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {

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
