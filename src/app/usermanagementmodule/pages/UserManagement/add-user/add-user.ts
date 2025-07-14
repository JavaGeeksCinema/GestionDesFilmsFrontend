import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- import this
import { Router } from '@angular/router';
import { UserService } from '../../../services/UserService';

@Component({
  selector: 'app-add-user',
  standalone: true,              // <-- add if you're using standalone component
  imports: [CommonModule],       // <-- add CommonModule here to enable *ngFor, *ngIf etc.
  templateUrl: './add-user.html',
  styleUrls: ['./add-user.css']
})
export class AddUser {
  roles = ['USER', 'ADMIN'];

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const role = (form.elements.namedItem('role') as HTMLSelectElement).value;

    const newUser = { username, email, password, role };

    this.userService.createUser(newUser).subscribe({
      next: (user) => {
        console.log('User created:', user);
        this.router.navigate(['/admin-user-management']);
      },
      error: (err) => {
        console.error('Failed to create user', err);
        alert('Failed to create user: ' + err.message);
      }
    });
  }
}
