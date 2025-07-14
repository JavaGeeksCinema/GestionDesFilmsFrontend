import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SeatComponent } from '../seat/seat.component';
import { SeatEmited } from '../utils/SeatEmitted';
import { Seat } from '../utils/Seat';

import { RoomserviceService } from '../services/roomservice.service';
import { Room } from '../utils/Room';
import { CommonModule } from '@angular/common';
import { RoomEmitted, RoomEmittedClass } from '../utils/RoomEmitted';
interface AlphabetEntry {
  letter: string;
  position: number;
}
@Component({
  selector: 'app-cinemaseats',
  standalone: true,
  imports: [CommonModule,SeatComponent],
  templateUrl: './cinemaseats.component.html',
  styleUrls: ['./cinemaseats.component.scss']
})
export class CinemaseatsComponent implements OnChanges{
    grid1:any=[];
    grid2:any=[];
    grid3:any=[];
    selectedSeats:Seat[]=[];
    @Output()
    returnSelectedSeats = new EventEmitter<RoomEmitted>();
    @Input()
    seats:Seat[] | undefined |null ;
    seatsavailable:any;
    uppercaseAlphabetTable: AlphabetEntry[] = [
    { letter: 'A', position: 1 },
    { letter: 'B', position: 2 },
    { letter: 'C', position: 3 },
    { letter: 'D', position: 4 },
    { letter: 'E', position: 5 },
    { letter: 'F', position: 6 },
    { letter: 'G', position: 7 },
    { letter: 'H', position: 8 },
    { letter: 'I', position: 9 },
    { letter: 'J', position: 10 },
    { letter: 'K', position: 11 },
    { letter: 'L', position: 12 },
    { letter: 'M', position: 13 },
    { letter: 'N', position: 14 },
    { letter: 'O', position: 15 },
    { letter: 'P', position: 16 },
    { letter: 'Q', position: 17 },
    { letter: 'R', position: 18 },
    { letter: 'S', position: 19 },
    { letter: 'T', position: 20 },
    { letter: 'U', position: 21 },
    { letter: 'V', position: 22 },
    { letter: 'W', position: 23 },
    { letter: 'X', position: 24 },
    { letter: 'Y', position: 25 },
    { letter: 'Z', position: 26 },
  ];
    constructor(private roomService:RoomserviceService){
      
    }
    ngOnChanges(changes: SimpleChanges) {
    if (changes['seats']) {
      // This code runs every time the 'seats' input changes
      console.log('Seats input changed:', this.seats);
      // Add your refresh logic here (e.g., update internal data, trigger animations, etc.)
      this.getInputSeatsAndGridDisplay();
    }
  }
    ngOnInit() {
      console.log(this.seats)
      if(this.seats==undefined){
        this.selectSeats();
        this.getAllSeatsAndGridDisplay();
      }else{
        this.getInputSeatsAndGridDisplay();
      }
    }

    getInputSeatsAndGridDisplay(){
      
      this.splitSeatsForGridDisplay(this.seats);
    }

    getAllSeatsAndGridDisplay(){
        this.roomService.getAllById(1).subscribe((data:any) => {
        console.log(data)
        this.seatsavailable = data.seats.filter((x:any) => x.seatStatus == 'AVAILABLE' ).length;
        console.log(this.seatsavailable)
        this.splitSeatsForGridDisplay(data.seats);
      });
    }
    splitSeatsForGridDisplay(data:any){
        this.grid1 = [];
        this.grid2 = [];
        this.grid3 = [];

        const pattern = [4, 6, 4];
        const result: Room[][] = [];
        let i = 0;
        let patternIndex = 0;
        console.log(data.length)
        while (i < data.length) {
          const groupSize = pattern[patternIndex % pattern.length];
          console.log(patternIndex % pattern.length)
          const group:any = Array.from(data).slice(i, i + groupSize);
          console.log(group)
          if((patternIndex % pattern.length)==0){
            this.grid1.push(...group)
          }
          if((patternIndex % pattern.length)==1){
            this.grid2.push(...group)
          }
          if((patternIndex % pattern.length)==2){
            this.grid3.push(...group)
          }
          i += groupSize;
          patternIndex++;
        }
        console.log(result)
        console.log(this.grid1)
        console.log(this.grid2)
        console.log(this.grid3)
  
    }
    onSeatSelected(seat: SeatEmited) {
      let i=0;
      if(seat.action=="remove"){
        this.selectedSeats.forEach((selectedSeat)=>{
          if(selectedSeat.id==seat.seat.id){
            this.selectedSeats.splice(i, 1);
          }
          i++;
        })
        console.log(this.selectedSeats)
      }else{
        this.selectedSeats.push(seat.seat) ;
        console.log('Selected seat:', seat);
        console.log(this.selectedSeats)
      }   
   
      this.selectSeats() 
    }

    selectSeats(){ 
      let roomEmitted:RoomEmitted = new RoomEmittedClass(this.selectedSeats,this.seatsavailable); 
      this.returnSelectedSeats.emit(roomEmitted)
    }
}
