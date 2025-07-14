import { Component } from '@angular/core';
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MyApiService} from "../services/my-api.service";

@Component({
  selector: 'app-reclamation-detail-user',
  standalone: true,
    imports: [
        DatePipe,
        FormsModule,
        NgForOf,
        ReactiveFormsModule,
      CommonModule
    ],
  templateUrl: './reclamation-detail-user.component.html',
  styleUrls: ['./reclamation-detail-user.component.scss']
})
export class ReclamationDetailUserComponent {
  message = '';
  messages: { sender: string, text: string, timestamp: Date }[] = [];

  reclamationId!: number;
  reclamation: any;
  timeline: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: MyApiService
  ) {}

  ngOnInit(): void {
    this.reclamationId = +this.route.snapshot.paramMap.get('id')!;

    this.api.getReclamationById(this.reclamationId).subscribe({
      next: (data) => {
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

  isResolved = false;


  onResolve(): void {
    this.api.resolveReclamation(this.reclamationId).subscribe({
      next: () => {
        console.log('Reclamation resolved!');
        this.isResolved = true;  // Disable input and send button
        // e.g., this.loadReclamationDetails();
      },
      error: err => console.error('Error resolving reclamation', err)
    });
  }


}
