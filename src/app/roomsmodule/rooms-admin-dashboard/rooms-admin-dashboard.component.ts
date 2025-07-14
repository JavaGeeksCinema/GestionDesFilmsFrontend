import { Component } from '@angular/core';
import { RoomserviceService } from '../services/roomservice.service';
import { Room } from '../utils/Room';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rooms-admin-dashboard',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule, MatIconModule, MatInputModule,],
  templateUrl: './rooms-admin-dashboard.component.html',
  styleUrls: ['./rooms-admin-dashboard.component.scss']
})
export class RoomsAdminDashboardComponent {
    
    rooms:Room[]=[]
    roomForm!: FormGroup;
    editmode:any;
      
    constructor(private fb: FormBuilder,private roomServices:RoomserviceService) {}
    ngOnInit() {
      this.roomForm = this.fb.group({
      id:0,
      roomName: '',
      showId:0,
      numberOfSeats: 0,
      seats:[]
    });
      this.getAllRooms();
    }
    edit(room:Room){
      this.roomForm.get('id')?.setValue(room.id);
      this.roomForm.get('roomName')?.setValue(room.roomName);
      this.roomForm.get('numberOfSeats')?.setValue(room.availablePlaces);
      console.log(this.roomForm)
      this.editmode=room.id;
    }
    cancel(){
      this.roomForm.get('roomName')?.setValue("");
      this.roomForm.get('numberOfSeats')?.setValue("");
      console.log(this.roomForm)
      this.editmode=0;
    }
    update(room:Room){
      this.roomForm.get('id')?.setValue(room.id);
      this.roomServices.updateRoom(room).subscribe({
        next: res => { 
          let index = this.rooms.findIndex(r => r.id === res.id);
          if (index !== -1) {
            this.rooms[index] = res;
          };
          console.log(res)
        },
          error: err => { 
            console.log(err)
        }})
    }
    getAllRooms(){
      this.roomServices.getAllRooms().subscribe({
        next: res => {this.rooms = res;console.log(res)},
        error: err => { 
          console.log(err)
    }})}

}
