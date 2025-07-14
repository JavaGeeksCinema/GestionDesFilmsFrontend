import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from "@angular/forms";
import { CommonModule, DatePipe, NgClass } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MyApiService } from "../services/my-api.service";

@Component({
  selector: 'app-reclamation-detail',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    DatePipe,
    CommonModule
  ],
  templateUrl: './reclamation-detail.component.html',
  styleUrls: ['./reclamation-detail.component.scss']
})
export class ReclamationDetailComponent {
  message = '';
  messages: { sender: string, text: string, timestamp: Date }[] = [];
  timeline: any[] = [];
  reclamationId!: number;
  reclamation: any;

  constructor(
    private route: ActivatedRoute,
    private api: MyApiService
  ) {}

  ngOnInit(): void {
    this.reclamationId = +this.route.snapshot.paramMap.get('id')!;

    this.api.getReclamationById(this.reclamationId).subscribe({
      next: (data) => {
        console.log('Reclamation data:', data); // Debug : affiche la réponse brute
        this.reclamation = data;

        const commentaires = Array.isArray(data.commentaires) ? data.commentaires : [];

        // Trie les commentaires par date de création (croissant)
        this.messages = commentaires
          .sort((a: any, b: any) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateA - dateB;
          })
          .map((comment: any, index: number) => ({
            sender: index % 2 === 0 ? 'User' : 'Admin',
            text: comment.description,
            timestamp: comment.createdAt ? new Date(comment.createdAt) : new Date()
          }));
      },
      error: (err) => console.error('Error fetching reclamation', err)
    });
    this.api.getAllReclamationsStatus(this.reclamationId).subscribe({
      next: (data) => {
        console.log('Received:', data);
        this.timeline = data; // ← this REPLACES the old value
      },
      error: (err) => {
        console.error('Failed to load timeline', err);
      }
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      const newMsg = {
        sender: 'You',
        text: this.message,
        timestamp: new Date()
      };

      this.messages.push(newMsg);

      this.api.postData_ReplyComment(this.message, this.reclamationId).subscribe({
        next: () => console.log('Reply comment saved!'),
        error: err => console.error('Error saving reply comment', err)
      });

      this.message = ''; // Clear input
    }
  }
}
