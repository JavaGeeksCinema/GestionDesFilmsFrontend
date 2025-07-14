import { Seat } from "./Seat";

export interface RoomEmitted {
    seats: Seat[];
    numberOfSeats: number;
  }


export class RoomEmittedClass {
    seats: Seat[];
    numberOfSeats!: number;
    constructor(seats:Seat[],numberOfSeats:number){
      this.seats=seats;
      this.numberOfSeats=numberOfSeats;
    }
}