import { Component } from '@angular/core';
import { ReclamationCardComponent } from '../reclamation-card/reclamation-card.component';
import {FormBuilder} from "@angular/forms";
import {MyApiService} from "../services/my-api.service";
import { CommonModule } from '@angular/common';  // <-- import this

@Component({
  selector: 'app-reclamation-home',
  standalone: true,
  imports: [ReclamationCardComponent, CommonModule],
  templateUrl: './reclamation-home.component.html',
  styleUrls: ['./reclamation-home.component.scss']   // <-- use 'styleUrls' plural
})
export class ReclamationHomeComponent {

  reclamations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private myApiService: MyApiService
  ) {}

  ngOnInit(): void {
    this.myApiService.getAllReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
      },
      error: (err) => {
        console.error('Failed to load reclamations', err);
      },
    });
  }


}
