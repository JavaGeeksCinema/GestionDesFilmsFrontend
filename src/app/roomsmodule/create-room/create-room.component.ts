import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { CinemaseatsComponent } from "../cinemaseats/cinemaseats.component";
import { Seat, SeatClass } from '../utils/Seat';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomserviceService } from '../services/roomservice.service';
import { RoomCreationDto } from '../utils/RoomCreationDto';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule, MatIconModule, MatInputModule, CinemaseatsComponent],
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent {
  seats$ = new BehaviorSubject<Seat[]>([]);
  visualiseMode=false;
  roomForm!: FormGroup;
  
  constructor(private fb: FormBuilder,private roomService:RoomserviceService) {}

  ngOnInit() {
    this.roomForm = this.fb.group({
      roomName: '',
      cinemaName: '',
      numberOfSeats: 0,
    });
    this.roomForm.get('numberOfSeats')?.valueChanges.subscribe(value => {
      console.log(value)
      this.generateSeats(value);
    });
     this.roomForm.get('roomName')?.valueChanges.subscribe(value => {
      console.log(value)
    });
  }
  onSubmit() {
    this.createRoom({roomName:this.roomForm.value.roomName,seatsNumber:this.roomForm.value.numberOfSeats});
  }
  createRoom(roomCreationDto:RoomCreationDto){
    this.roomService.createRoom(roomCreationDto).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )
  }
 generateSeats(numberOfSeats:number){
  let table:Seat[] = [];
  for (let i = 0; i < numberOfSeats; i++) {
    const seat: Seat = new SeatClass();
    seat.id = i;
    seat.seatNumber = i + 1;
    seat.seatStatus = 'AVAILABLE';
    seat.seatType = 'SIMPLE';
    table.push(seat);
  }
  this.seats$.next(table);
  this.visualiseMode = true;
  }
}
