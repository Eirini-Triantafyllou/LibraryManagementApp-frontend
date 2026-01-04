import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserLoginDTO, LoggedInUser, UserReadOnlyDTO } from '../../shared/interfaces/user'
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { DashboardService } from '../../shared/services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [RouterModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login-user.html',
  styleUrl: './login-user.css',
})

export class LoginUser {
  authService = inject(AuthService);
  router = inject(Router);
  dashboardService = inject(DashboardService);

  // Χρήση signals για state management
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    password: new FormControl('', [
      Validators.required,
      this.passwordValidator()        // custom validator
    ]),
    keepLoggedIn: new FormControl(false)     
  });
email: any;
password: any;


  // Custom validator για password
passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null; // Οι required validators θα το χειριστούν
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /\W/.test(value);
    const hasMinLength = value.length >= 8;

    const errors: ValidationErrors = {};
    
    if (!hasUpperCase) errors['uppercase'] = true;
    if (!hasLowerCase) errors['lowercase'] = true;
    if (!hasDigit) errors['digit'] = true;
    if (!hasSpecialChar) errors['specialChar'] = true;
    if (!hasMinLength) errors['minlength'] = { requiredLength: 8, actualLength: value.length };

    return Object.keys(errors).length > 0 ? { passwordPattern: errors } : null;
  };
}

// Helper method για error messages
  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }
    
    const errors = control.errors;
    
     if (controlName === 'email') {
      if (errors['required']) return 'Email is required';
      if (errors['email']) return 'Please enter a valid email address';
      if (errors['minlength']) return 'Email must be at least 2 characters';
      if (errors['maxlength']) return 'Email cannot exceed 50 characters';
    }

    if (controlName === 'password') {
      if (errors['required']) return 'Password is required';
      if (errors['passwordPattern']) {
        const patternErrors = errors['passwordPattern'];
        const messages: string[] = [];
        
        if (patternErrors['uppercase']) messages.push('one uppercase letter');
        if (patternErrors['lowercase']) messages.push('one lowercase letter');
        if (patternErrors['digit']) messages.push('one digit');
        if (patternErrors['specialChar']) messages.push('one special character');
        if (patternErrors['minlength']) messages.push('at least 8 characters');
        
        return `Password must contain: ${messages.join(', ')}`;
      }
    }
    
    return 'Invalid value';
  }

  onSubmit(): void {
      // 1. ΈΛΕΓΧΟΣ ΕΓΚΥΡΟΤΗΤΑΣ ΦΟΡΜΑΣ
  if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }
  
    // 2. Reset states
    this.isLoading.set(true);
    this.errorMessage.set(null);

   // 3. ΔΗΜΙΟΥΡΓΙΑ LOGIN DTO
  const loginData: UserLoginDTO = {
    email: this.form.value.email!,
    password: this.form.value.password!,
    keepLoggedIn: true
  };

  console.log('Submitting login:', loginData);

  // 4. ΚΛΗΣΗ AUTH SERVICE
  this.authService.login(loginData).subscribe({
    next: (response) => {
       
      this.isLoading.set(false);

      this.dashboardService.redirectToUserDashboard(response.user);
    },
    error: (error) => {
      console.error('Login error:', error);
      this.isLoading.set(false);
      this.errorMessage.set(error.error?.message || 'Login failed');
      }
    });
  }

  resetForm(): void {
    this.form.reset({
      email: '',
      password: ''
    });
  }
}

