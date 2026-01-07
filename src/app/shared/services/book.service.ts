import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BookByAuthorDTO } from '../interfaces/book';
import { PaginatedResult } from '../interfaces/pagination';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  http: HttpClient = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  searchBooksByAuthor(
    authorName: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PaginatedResult<BookByAuthorDTO>>
  {
    if(!authorName || authorName.trim().length === 0) {
      return throwError(() => new Error('Το όνομα του συγγραφέα είναι υποχρεωτικό'));
    }

    // Query parameters
    let params = new HttpParams()
      .set('authorName', authorName.trim())
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    const endpoint = `${this.apiUrl}/api/Books/SearchBookByAuthorName`;

    return this.http.get<PaginatedResult<BookByAuthorDTO>>(endpoint, { params });
  }
}
