import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../shared/services/book.service';
import { BookByAuthorDTO, CreateBookDTO } from '../../shared/interfaces/book';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-create-book-librarian',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-book-librarian.html',
  styleUrl: './create-book-librarian.css',
})
export class CreateBookLibrarian {
  bookService = inject(BookService);
  router = inject(Router);

  createStatus: {success: boolean, message: string} = {
    success: false,
    message: "Not attempted yet"
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    authorFullName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
    isbn: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}(\d{3})?$/)]),
    publishedDate: new FormControl('', [Validators.required]),
    copiesAvailable: new FormControl('', [Validators.required])
  })

  onSubmit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.createStatus = {
        success: false,
        message: "Please fill all required fields correctly"
      };
      return;
    }

    const formValue = this.form.value;
    const book: CreateBookDTO = {
      title: formValue.title!,
      authorFullName: formValue.authorFullName!,
      description: formValue.description!,
      isbn: formValue.isbn!,
      publishedDate: formValue.publishedDate as unknown as Date,
      copiesAvailable: Number(formValue.copiesAvailable)
    }

    this.bookService.createBook(book).subscribe({
      next: (response) => {
        console.log('Book created:', response);
        this.router.navigate(['/librarian-dashboard']);

        this.createStatus = {
          success: true,
          message: "Book created successfully"
        };
      },
      error: (error) => {
        console.log("There was error", error);
        let errorMessage = 'Σφάλμα κατά την εγγραφή';
        if (error.status === 400) {
          errorMessage = error.error?.message || 'Μη έγκυρα δεδομένα';
            } else if (error.status === 409) {
            errorMessage = 'Ο τίτλος του βιβλίου ή το isbn υπάρχουν ήδη';
            }
          this.createStatus = {
            success: false,
            message: error.error?.message || "An error occurred. Please try again."
          };
        }
    });
  }
}  


