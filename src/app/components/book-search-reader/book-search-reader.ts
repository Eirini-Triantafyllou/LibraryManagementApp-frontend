import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../shared/services/book.service';
import { BookByAuthorDTO } from '../../shared/interfaces/book';
import { PaginatedResult } from '../../shared/interfaces/pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../shared/services/wishlist.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { AppError } from '../../shared/interfaces/errors';


@Component({
  selector: 'app-book-search-reader',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  templateUrl: './book-search-reader.html',
  styleUrl: './book-search-reader.css',
})
export class BookSearch implements OnInit {
  bookService = inject(BookService);
  wishlistService = inject(WishlistService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  loading = false;
  errorMessage = '';
  successMessage = '';
  searchResults: PaginatedResult<BookByAuthorDTO> | null = null;

  loadingBookId: number | null = null;

  displayedColumns: string[] = ['title', 'authorFullName', 'isbn', 'publishedDate', 'copiesAvailable', 'wishlist'];

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  searchForm = new FormGroup({
    authorFullName: new FormControl('',[Validators.required, Validators.minLength(2)])
  });

  ngOnInit(): void {
    this.searchForm.get('authorFullName')?.valueChanges
    .subscribe(value => {
      if (value && value.length >= 2) {
        this.searchBooks(value, 1);
      }
    });
  }

  searchBooks(authorFullName: string, pageNumber: number): void {
    if (!authorFullName?.trim()) {
    this.errorMessage = 'Παρακαλώ εισάγετε όνομα συγγραφέα';
    return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.currentPage = pageNumber;

    this.bookService.searchBooksByAuthor(authorFullName, pageNumber, this.pageSize)
    .subscribe({
      next: (result) => {
        this.searchResults = result;
        this.totalItems = result.totalRecords;
        this.totalPages = result.totalPages;
        this.loading = false;

        if (result.data.length === 0) {
          this.errorMessage = `Δε βρέθηκαν βιβλία για τον συγγραφέα "${authorFullName}"`;
        }
      },
      error: (error) => {
        this.errorMessage = this.errorMessage || 'Σφάλμα κατά την αναζήτηση';
        this.searchResults = null;
        this.loading = false;
      }
    });
  }

   toggleWishlist(book: BookByAuthorDTO): void {
    this.loadingBookId = book.id;
    
    const isCurrentlyInWishlist = book.isInWishlist || false;
    
    if (isCurrentlyInWishlist) {
      this.removeFromWishlist(book);
    } else {
      this.addToWishlist(book);
    }
  }

  private addToWishlist(book: BookByAuthorDTO): void {
    this.wishlistService.addToWishlist(book.id)
      .subscribe({
          next: () => {
            book.isInWishlist = true;
            this.successMessage = `Το βιβλίο "${book.title}" προστέθηκε στη wishlist!`;
            this.loadingBookId = null;
            setTimeout(() => this.successMessage = '', 2000);
          },
         error: (error: AppError) => {
          console.error('Error adding to wishlist:', error);
          this.loadingBookId = null;
          this.errorMessage = error.userMessage || 'Σφάλμα προσθήκης στη wishlist';
          setTimeout(() => this.errorMessage = '', 3000);
         }
      });
  }

  private removeFromWishlist(book: BookByAuthorDTO): void {
    this.wishlistService.removeFromWishlist(book.id)
      .subscribe({ 
        next: () => {
          book.isInWishlist = false;
          this.successMessage = `Το βιβλίο "${book.title}" αφαιρέθηκε από τη wishlist`;
          this.loadingBookId = null;
          setTimeout(() => this.successMessage = '', 2000);
        },
        error: (error: AppError) => {
          console.error('Error removing from wishlist:', error);
        this.loadingBookId = null;
        this.errorMessage = error.userMessage || 'Σφάλμα αφαίρεσης από τη wishlist';
        setTimeout(() => this.errorMessage = '', 3000);
        }
      })
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    const authorFullName = this.searchForm.get('authorFullName')?.value;
    this.searchBooks(authorFullName!, page);
  }

  get pages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

     for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
