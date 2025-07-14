import { Type } from "./Type";

export interface Seat {
    id: number;
    seatNumber: number;
    seatType:string;
    seatStatus: any;
}
export class SeatClass implements Seat{
    id!: number;
    seatNumber!: number;
    seatType!: string;
    seatStatus: any;
    
}