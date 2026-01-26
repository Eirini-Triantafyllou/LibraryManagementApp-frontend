import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { User, UserSignupDTO } from '../../shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { UserRole } from '../../shared/enums/user-role';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-user',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './signup-user.html',
  styleUrl: './signup-user.css',
})
export class SignupUser {
  authService = inject(AuthService);
  router = inject(Router);
  
    registrationStatus: {success: boolean, message:string} = {
      success: false,
      message: "Not attempted yet"
    }
  
    form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      phoneNumber: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      userRole: new FormControl('', [Validators.required]),     
      confirmPassword: new FormControl('',Validators.required)                        
    }, { validators: this.passwordConfirmValidator});
      

    passwordConfirmValidator(control: AbstractControl):{[key:string]:boolean} | null {
      const form = control as FormGroup;
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
  
      if (password && confirmPassword && password!== confirmPassword) {
        form.get('confirmPassword')?.setErrors({passwordMissmatch: true});
        return {passwordMissmatch: true}
      }
      return null;
    }
  
    onSubmit(){
      if (this.form.invalid) {
        this.form.markAllAsTouched();  
        this.registrationStatus = {
        success: false,
        message: "Please fill all required fields correctly"
      };
        return;
      }

      const formValue = this.form.value;
      const user: UserSignupDTO = {
        username: formValue.username!,
        email: formValue.email!,
        password: formValue.password!,
        firstname: formValue.firstname!,
        lastname: formValue.lastname!,
        phoneNumber: formValue.phoneNumber!,
        address: formValue.address!,
        userRole: formValue.userRole! as unknown as UserRole
      }
  
      this.authService.signUpUser(user).subscribe({
        next: (response) => {
          // this.form.reset();
          console.log('User created:', response);
          this.router.navigate(['/login-user']);

          this.registrationStatus = {
            success: true,
            message: "User created successfully"
          };
        },
        error: (error) => {
          console.log("There was error", error);
          let errorMessage = 'Σφάλμα κατά την εγγραφή';
          if (error.status === 400) {
            errorMessage = error.error?.message || 'Μη έγκυρα δεδομένα';
            } else if (error.status === 409) {
            errorMessage = 'Το username ή email υπάρχει ήδη';
            }
          this.registrationStatus = {
            success: false, 
            message: error.error?.message || "An error occurred. Please try again."
          };
        }
      });
    }
  }


