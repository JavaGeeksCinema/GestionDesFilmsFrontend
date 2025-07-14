import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../utils/Room';
import { Seat } from '../utils/Seat';
import { SeatLockRequest } from '../utils/SeatLockRequest';
import { RoomCreationDto } from '../utils/RoomCreationDto';
import { StripeResponse } from '../utils/StripeResponse';

@Injectable({
  providedIn: 'root'
})
export class RoomserviceService {
  private apiUrl = 'http://localhost:8082/roomservices/rooms'; // Replace with your API
  private apiUrlSeats = 'http://localhost:8082/roomservices/seats';
  constructor(private http: HttpClient) { }

  getAllById(id:number): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl+"/"+id);
  }
  reserveSeat(lockRequest:SeatLockRequest){
    return this.http.post<StripeResponse>(this.apiUrlSeats+"/lock",lockRequest)
  }
  confirmSeatReservation(lockRequest:SeatLockRequest){
    return this.http.post<Seat>(this.apiUrlSeats+"/confirm",lockRequest)
  }
  updateRoom(room:Room){
    return this.http.put<Room>(this.apiUrl,room)
  }
  createRoom(roomCreationDto:RoomCreationDto){
    return this.http.post<Seat>(this.apiUrl,roomCreationDto)
  }
  getAllRooms(){
    return this.http.get<Room[]>(this.apiUrl)
  }
}
