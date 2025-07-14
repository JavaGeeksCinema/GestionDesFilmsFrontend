import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // <-- import FormsModule here
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/UserService';

@Component({
  selector: 'app-edit-user',
  standalone: true,   // assuming standalone component
  imports: [CommonModule, FormsModule],  // <-- add FormsModule here
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.css']
})
export class EditUser implements OnInit {
  userId!: number;
  roles = ['USER', 'ADMIN'];

  userData = {
    username: '',
    email: '',
    password: '',
    role: 'USER',
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userData.username = user.username;
        this.userData.email = user.email;
        this.userData.role = user.role;
      },
      error: (err) => {
        console.error('Failed to load user', err);
        alert('Failed to load user data');
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const updatedUser: any = {
      username: this.userData.username,
      email: this.userData.email,
      role: this.userData.role,
    };

    if (this.userData.password) {
      updatedUser.password = this.userData.password;
    }

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.router.navigate(['/admin-user-management']);
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update user');
      }
    });
  }
}
