import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private toaster: ToastrService) {}

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
          this.toaster.success("Welcome back!😊 You have successfully logged in.")
          this.router.navigate(['/BookList']);
        },
        error: (err) => {
          this.toaster.error(err);
          this.isLoading = false;
        },
      });
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.toaster.success("You did it!😊 Your account is ready. Let’s get started!")
          this.router.navigate(['/BookList']);
        },
        error: (err) => {
          this.toaster.error(err);
          this.isLoading = false;
        },
      });
    }

    console.log(form.value);
    form.reset();
  }
}
