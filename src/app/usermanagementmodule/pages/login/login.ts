import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ Mark as standalone
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private http: HttpClient) {}

  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    this.http.post<{ message: string, userId: number }>('http://localhost:8081/auth/login', { email, password })
  .subscribe({
    next: (res) => {
      console.log(res.message);
      if (res.userId) {
        localStorage.setItem('userId', res.userId.toString()); // ✅ store it
        console.log('Stored user ID:', res.userId);

        
      }
    },
    error: (err) => {
      console.error('Login failed:', err);
    }
  });

}
}
