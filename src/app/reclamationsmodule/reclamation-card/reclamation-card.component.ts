import { Component } from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";
import {Input} from "@angular/core";

@Component({
  selector: 'app-reclamation-card',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './reclamation-card.component.html',
  styleUrls: ['./reclamation-card.component.scss']
})
export class ReclamationCardComponent {
  @Input() reclamation: any;  // <-- Correct usage here, no 'new'

}
