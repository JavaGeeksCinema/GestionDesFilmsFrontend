import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile implements OnInit {
  userData = {
    username: '',
    email: '',
    role: '',
    id: '',
    description: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.http.get<any>(`http://localhost:8081/users/${userId}`).subscribe({
          next: (data) => {
            this.userData = {
              username: data.username || '',
              email: data.email || '',
              role: data.role || '',
              id: data.id || '',
              description: data.description || ''
            };
          },
          error: (err) => {
            console.error('Failed to load user data', err);
          }
        });
      } else {
        console.warn('No userId found in localStorage');
      }
    } else {
      console.warn('localStorage is not available');
    }
  }

  updateProfile() {
    console.log('Update Profile clicked', this.userData);
  }
}
