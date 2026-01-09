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
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-book-search',
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
    MatSnackBarModule
  ],
  templateUrl: './book-search.html',
  styleUrl: './book-search.css',
})
export class BookSearch implements OnInit {
  bookService = inject(BookService);
  loading = false;
  errorMessage = '';
  searchResults: PaginatedResult<BookByAuthorDTO> | null = null;

  displayedColumns: string[] = ['title', 'authorName', 'isbn', 'publishedDate', 'copiesAvailable'];

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  searchForm = new FormGroup({
    authorName: new FormControl('',[Validators.required, Validators.minLength(2)])
  });

  ngOnInit(): void {
    this.searchForm.get('authorName')?.valueChanges
    .subscribe(value => {
      if (value && value.length >= 2) {
        this.searchBooks(value, 1);
      }
    });
  }

  searchBooks(authorName: string, pageNumber: number): void {
    if (!authorName?.trim()) {
    this.errorMessage = 'Παρακαλώ εισάγετε όνομα συγγραφέα';
    return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.currentPage = pageNumber;

    this.bookService.searchBooksByAuthor(authorName, pageNumber, this.pageSize)
    .subscribe({
      next: (result) => {
        this.searchResults = result;
        this.totalItems = result.totalRecords;
        this.totalPages = result.totalPages;
        this.loading = false;

        if (result.data.length === 0) {
          this.errorMessage = `Δε βρέθηκαν βιβλία για τον συγγραφέα "${authorName}"`;
        }
      },
      error: (error) => {
        this.errorMessage = this.errorMessage || 'Σφάλμα κατά την αναζήτηση';
        this.searchResults = null;
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    const authorName = this.searchForm.get('authorName')?.value;
    this.searchBooks(authorName!, page);
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
