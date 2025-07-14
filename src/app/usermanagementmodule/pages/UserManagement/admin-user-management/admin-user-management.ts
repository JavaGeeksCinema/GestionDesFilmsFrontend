import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/UserService';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-user-management.html',
  styleUrls: ['./admin-user-management.css']
})
export class AdminUserManagement implements OnInit {

  users: User[] = [];
  loading = true;
  error = '';

  constructor(
    private userService: UserService,
    private router: Router   // Inject router here
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  onAddUser(): void {
    this.router.navigate(['/admin/users/adduser']);
  }

 onDeleteUser(id: number): void {
  if (confirm('Are you sure you want to delete this user?')) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
      },
      error: () => {
        alert('Failed to delete user');
      }
    });
  }
}

}
