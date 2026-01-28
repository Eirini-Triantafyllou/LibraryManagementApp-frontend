import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Book, BookByAuthorDTO, CreateBookDTO, UpdateBookDTO } from '../interfaces/book';
import { PaginatedResult } from '../interfaces/pagination';
import { environment } from '../../../environments/environment.development';
import { ErrorUtils } from '../utils/error.utils';
import { ApiResponse } from '../interfaces/errors';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  http: HttpClient = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  // Reader method
  searchBooksByAuthor(
    authorName: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PaginatedResult<BookByAuthorDTO>>
  {
    // Query parameters
    let params = new HttpParams()
      .set('authorName', authorName.trim())
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    const endpoint = `${this.apiUrl}/api/Books/SearchBooksByAuthorName`;

    return this.http.get<PaginatedResult<BookByAuthorDTO>>(endpoint, { params })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(() => ErrorUtils.createAppError(error))
        )
    );
  }

  // Librarian methods
  searchBookById(bookId: number): Observable<BookByAuthorDTO> {

    const endpoint = `${this.apiUrl}/api/Books/GetBookById/${bookId}`;

    return this.http.get<BookByAuthorDTO>(endpoint)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(() => ErrorUtils.createAppError(error))
        )
    );
  }

  createBook(data: CreateBookDTO): Observable<BookByAuthorDTO> {

    const endpoint = `${this.apiUrl}/api/Books/CreateBook`;

    return this.http.post<BookByAuthorDTO>(endpoint, data)
      .pipe(
        catchError((error: HttpErrorResponse) => 
          throwError(() => ErrorUtils.createAppError(error)))
      );
  }


  updateBook(bookId: number, data: UpdateBookDTO): Observable<BookByAuthorDTO> {

    const endpoint = `${this.apiUrl}/api/Books/UpdateBook/${bookId}`;

    return this.http.put<BookByAuthorDTO>(endpoint, data)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(() => ErrorUtils.createAppError(error))
      )
    );
  }

  deleteBook(bookId: number): Observable<ApiResponse> {
    const endpoint = `${this.apiUrl}/api/Books/DeleteBooks/${bookId}`;

    return this.http.delete<any>(endpoint)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(() => ErrorUtils.createAppError(error))
      )
    );
  }
}
