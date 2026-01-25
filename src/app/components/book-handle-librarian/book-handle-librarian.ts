import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { BookService } from '../../shared/services/book.service';
import { BookByAuthorDTO, UpdateBookDTO } from '../../shared/interfaces/book';
import { ApiResponse, AppError } from '../../shared/interfaces/errors';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-handle-librarian',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    MatTabsModule
  ],
  templateUrl: './book-handle-librarian.html',
  styleUrl: './book-handle-librarian.css',
})
export class BookHandleLibrarian implements OnInit {
  bookService = inject(BookService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);
  bookId: number = 0;

  loading = false;
  searching = false;
  updating = false;
  deleting = false;

  currentBook: BookByAuthorDTO | null = null;
  errorMessage = '';
  successMessage = '';

  searchForm = new FormGroup({
    bookId: new FormControl('', [Validators.required, Validators.min(1)])
    });

  editForm = new FormGroup({
    title: new FormControl('', [Validators.required,
      Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required,
      Validators.minLength(5), Validators.maxLength(500)]),
    copiesAvailable: new FormControl('', [Validators.required])    
  });  

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
      
      if (!this.bookId) {
        console.error('No bookId found in route parameters');
        this.errorMessage = 'Book ID is missing' 
        };
    }

  searchBook(): void {
    if (this.searchForm.invalid) {
      this.snackBar.open('Παρακαλώ εισάγετε έγκυρο ID βιβλίου', 'OK', { duration: 3000 });
      return;
    }

    const formBookId = this.searchForm.value.bookId;
    if (!formBookId) {
      this.snackBar.open('Παρακαλώ εισάγετε ID βιβλίου', 'OK', { duration: 3000 });
      return;
    }

    this.searching = true;
    this.errorMessage = '';
    this.currentBook = null;

    const bookIdToSearch = Number(formBookId);

    this.bookService.searchBookById(bookIdToSearch).subscribe({
      next: (book) => {
        this.currentBook = book;
        this.searching = false;
        this.snackBar.open('Το βιβλίο βρέθηκε επιτυχώς!', 'OK', { duration: 2000 });

        this.editForm.patchValue({
          title: book.title,
          description: book.description || '',
          copiesAvailable: book.copiesAvailable.toString()
        });
      },
      error: (error: AppError) => {
        this.searching = false;
        this.errorMessage = error.userMessage;
        this.snackBar.open(error.userMessage, 'Κλείσιμο');
      }
    });
  }

  updateBook(): void {
    if (this.editForm.invalid || !this.currentBook) {
      this.snackBar.open('Παρακαλώ συμπληρώστε σωστά όλα τα πεδία', 'OK', { duration: 3000 });
      return;
    }

    this.updating = true;

    const updateData: UpdateBookDTO = {
      title: this.editForm.value.title || '',
      description: this.editForm.value.description || '',
      copiesAvailable: Number (this.editForm.value.copiesAvailable) || 0
    };

    this.bookService.updateBook(this.currentBook.id, updateData).subscribe({
      next: (updatedBook) => {
        this.currentBook = updatedBook;
        this.updating = false;
        this.snackBar.open('Το βιβλίο ενημερώθηκε επιτυχώς!', 'OK', { duration: 2000 });
      },
      error: (error: AppError) => {
        this.updating = false;
        this.snackBar.open(error.userMessage, 'Κλείσιμο');
      }
    });
  }

  deleteBook(): void {
    if (!this.currentBook) {
      this.snackBar.open('Δεν υπάρχει βιβλίο για διαγραφή', 'OK', { duration: 3000 });
      return;
    }

     if (!confirm(`Είστε σίγουρος ότι θέλετε να διαγράψετε το βιβλίο "${this.currentBook.title}";\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί.`)) {
      return;
    }

    this.deleting = true;
    this.bookService.deleteBook(this.currentBook.id).subscribe({
      next: (response: ApiResponse) => {
        this.deleting = false;
        this.currentBook = null;
        this.editForm.reset();
        this.searchForm.reset();
        this.snackBar.open(response.message || 'Το βιβλίο διαγράφηκε επιτυχώς', 'OK', { duration: 2000 });
      },
      error: (error: AppError) => {
        this.deleting = false;
        this.snackBar.open(error.userMessage, 'Κλείσιμο');
      }
    });
  }

  resetForm(): void {
    this.currentBook = null;
    this.editForm.reset();
    this.errorMessage = '';
  }
}
