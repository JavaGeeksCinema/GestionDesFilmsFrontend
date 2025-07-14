import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.css']
})
export class CreateAccount {

  // Inject HttpClient
  constructor(private http: HttpClient) {}

  // Called on form submit
  onSubmit(event: Event): void {
    event.preventDefault(); // prevent page reload

    const form = event.target as HTMLFormElement;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const signupData = {
      username: username,
      email: email,
      password: password,
      role: 'USER'  // or whatever default role you want
    };

    // Call backend signup API
    this.http.post('http://localhost:8081/users/signup', signupData)
      .subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          alert('Account created successfully! You can now login.');
          form.reset();
        },
        error: (error) => {
          console.error('Error creating user:', error);
          alert('Failed to create account. Please try again.');
        }
      });
  }
}
