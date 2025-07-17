import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ Mark as standalone
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  role:String ="ADMIN";
  constructor(private http: HttpClient , private router : Router ) {}

  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    this.http.post<{ message: string, userId: number, role: string }>('http://localhost:9000/auth/login', { email, password })
      .subscribe({
        next: (res) => {
          console.log(res.message);
          if (res.userId) {
            localStorage.setItem('userId', res.userId.toString()); // ✅ store userId
            localStorage.setItem('role', res.role);
            this.role=res.role;// ✅ store role
            console.log('Stored user ID:', res.userId);
            console.log('Stored role:', res.role);
            if(this.role=="ADMIN"){
              this.router.navigate(["/dashbord"]);
            }else{
              this.router.navigate(["/gridmovies"]);

            }

          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });

}
}
