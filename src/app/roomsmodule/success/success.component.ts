import { Component } from '@angular/core';
import { RoomserviceService } from '../services/roomservice.service';
import { ActivatedRoute } from '@angular/router';
import { StripeResponse } from '../utils/StripeResponse';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
    ids: number[] = [];

    constructor(private roomService: RoomserviceService,private route: ActivatedRoute){
     
    }
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const encodedIds = params['ids']; // raw string: "{2,3,4}"
      if (encodedIds) {
        // Remove curly braces and split the values
        const cleaned = encodedIds.replace(/[{}]/g, '');
        this.ids = cleaned.split(',').map((id: string | number) => +id); // Convert to number[]
        console.log('Extracted IDs:', this.ids);
      }
      this.confirm()
    });
    
    
  }


   confirm(){
          this.roomService.confirmSeatReservation({seatIds:this.ids,userId:1}).subscribe({
            next: data => console.log(data),
            error: err => console.error('Error loading items', err)}
          )
    }


}
