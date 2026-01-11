import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { WishlistItemDTO } from '../interfaces/wishlist';
import { AppError, ApiResponse } from '../interfaces/errors';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})


export class WishlistService {
  http: HttpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private handleError(error: HttpErrorResponse): Observable<never> {
    const appError: AppError = {
      status: error.status,
      code: error.error?.code,          
      message: error.error?.message,   
      userMessage: this.getUserFriendlyMessage(error),
      originalError: error
    };
    console.error('WishlistService Error:', appError);
    return throwError(() => appError);
  }

  private getUserFriendlyMessage(error: HttpErrorResponse): string {
    
    if (error.error?.userMessage) {
      return error.error.userMessage;
    }
    
    switch (error.status) {
      case 0:
        return 'Unable to connect to the server. Please check your internet connection.';
      
      case 400:
        if (error.error?.code === 'book_already_in_wishlist') {
          return 'This book is already in your wishlist.';
        }
        if (error.error?.code === 'user_not_found') {
          return 'User account not found.';
        }
        return 'Invalid request. Please check your input.';
      
      case 401:
        return 'Your session has expired. Please log in again.';
      
      case 403:
        return 'You do not have permission to perform this action.';
      
      case 404:
        if (error.error?.code === 'book_not_found') {
          return 'Book not found.';
        }
        if (error.error?.code === 'wishlist_item_not_found') {
          return 'This book is not in your wishlist.';
        }
        return 'The requested resource was not found.';
      
      case 500:
      case 502:
      case 503:
      case 504:
        return 'Server error. Please try again later.';
      
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  } 

  getUserWishlist(): Observable<WishlistItemDTO[]> {
    const endpoint = `${this.apiUrl}/api/Wishlist/GetUserWishlist`;

    return this.http.get<WishlistItemDTO[]>(endpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
  
  checkIfInWishlist(bookId: number): Observable<boolean> {
    const endpoint = `${this.apiUrl}/api/Wishlist/CheckIfInWishlist/${bookId}`;

    return this.http.get<boolean>(endpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  addToWishlist(bookId: number): Observable<ApiResponse>{
    const endpoint = `${this.apiUrl}/api/Wishlist/AddToWishlist/${bookId}`;

    return this.http.post<any>(endpoint, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  removeFromWishlist(bookId: number): Observable<ApiResponse>{
    const endpoint = `${this.apiUrl}/api/Wishlist/RemoveFromWishlist/${bookId}`;

    return this.http.delete<any>(endpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
}
