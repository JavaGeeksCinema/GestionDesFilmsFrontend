import { Seat } from "./Seat";

export interface SeatLockRequest {
    seatIds: number[];
    userId: Number;
  }