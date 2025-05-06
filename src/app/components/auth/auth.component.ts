import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/BookList']);
        },
        error: (err) => {
          alert(err);
          
          this.isLoading = false;
        },
      });
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
        },
        error: (err) => {
          alert(err);
          this.isLoading = false;
        },
      });
    }

    console.log(form.value);
    form.reset();
  }
}
