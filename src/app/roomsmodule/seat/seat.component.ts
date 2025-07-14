import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { Seat } from '../utils/Seat';
import { SeatEmited } from '../utils/SeatEmitted';



@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})


export class SeatComponent {
  
  @Output()
  isSelected = new EventEmitter<SeatEmited>();
  @Input()
  selected:any="AVAILABLE";
  @Input()
  seattype!: Seat;
  select(){
    if(this.seattype != undefined && this.seattype.seatStatus != 'RESERVED' ){
      if(this.selected=="SELECTED"){
        this.selected ='AVAILABLE';
      }else{
        this.selected ='SELECTED';
      }
      if(this.selected == 'SELECTED'){
            this.isSelected.emit({seat:this.seattype,action:"add"})
      }else{
            this.isSelected.emit({seat:this.seattype,action:"remove"})
      }
    }
   
  }
}
