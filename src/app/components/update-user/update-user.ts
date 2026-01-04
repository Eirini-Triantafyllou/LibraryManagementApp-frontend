import { Component, inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { 
  FormControl, 
  FormGroup, 
  AbstractControl, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UpdateUserReaderDTO, UserReadOnlyDTO } from '../../shared/interfaces/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css',
})
export class UpdateUser {
  userService = inject(UserService);

    updateStatus: {success: boolean, message:string} = {
      success: false,
      message: "Not attempted yet"
    }

    form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      phoneNumber: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)])
    });

    onSubmit(){
      if (this.form.invalid) {
        this.form.markAllAsTouched();  
        this.updateStatus = {
        success: false,
        message: "Please fill all required fields correctly"
      };
        return;
      }

      const formValue = this.form.value;
      const user: UpdateUserReaderDTO = {
        username: formValue.username!,
        email: formValue.email!,
        firstname: formValue.firstname!,
        lastname: formValue.lastname!,
        phoneNumber: formValue.phoneNumber!,
        address: formValue.address!
      }

      this.userService.updateUser(user).subscribe({
        next: (response) => {
          this.form.reset();
          console.log('User updated:', response);

          this.updateStatus = {
            success: true,
            message: "User updated successfully"
          };
        },
        error: (error) => {
          console.log("There was error", error);
          let errorMessage = 'Σφάλμα κατά την ενημέρωση στοιχείων';

          this.updateStatus = {
            success: false, 
            message: error.error?.message || "An error occurred. Please try again."
          };
        }
      })
    }
    
}
