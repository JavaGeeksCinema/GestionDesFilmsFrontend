import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SeatComponent } from "../seat/seat.component";
import { Type } from '../utils/Type';
import { RoomserviceService } from '../services/roomservice.service';
import { Room } from '../utils/Room';
import { Seat } from '../utils/Seat';
import { SeatEmited } from '../utils/SeatEmitted';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { CinemaseatsComponent } from '../cinemaseats/cinemaseats.component';
import { RoomEmitted } from '../utils/RoomEmitted';
import { StripeResponse } from '../utils/StripeResponse';



@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, SeatComponent,CinemaseatsComponent,MatIconModule,MatChipsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  url="https://th.bing.com/th/id/OIP.evrSmrlcBGqm0QrWOOp7KAEDF_?r=0&rs=1&pid=ImgDetMain"
  type = Type;
  rooms: any = [];
  grid1:any=[];
  grid2:any=[];
  grid3:any=[];
  selectedSeats:Seat[]=[];
  seatsavailable:any;
  errorDiv:any;

  constructor(private roomService: RoomserviceService){
   
  }
  selectSeats(roomEmitted: RoomEmitted) {
    console.log(roomEmitted)
     this.selectedSeats = roomEmitted.seats;
     this.seatsavailable = roomEmitted.numberOfSeats;
  }
  
  showError() {
    this.errorDiv = "locked";

    // Hide after 3 seconds
    setTimeout(() => {
      this.errorDiv = "none";
    }, 3000); // 3000 ms = 3 seconds
  }

  lockSeats(){
        this.roomService.reserveSeat({seatIds:this.selectedSeats.map(x => x.id),userId:1}).subscribe(
          (response: StripeResponse) => {
            if (response.sessionUrl) {
              window.location.href = response.sessionUrl; // redirect to Stripe
            } else {
              console.error('Stripe session URL missing');
              this.showError()
            } });
  }

    
}