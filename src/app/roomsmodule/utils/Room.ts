import { Seat } from "./Seat";

export interface Room {
    id: number;
    availablePlaces: number;
    roomName:string;
    showId:number;
    seats:Seat[];
    // add other fields as needed
  }