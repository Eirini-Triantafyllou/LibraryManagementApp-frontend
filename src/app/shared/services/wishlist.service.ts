import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { WishlistItemDTO } from '../interfaces/wishlist';
import { AppError, ApiResponse } from '../interfaces/errors';
import { environment } from '../../../environments/environment.development';
import { ErrorUtils } from '../utils/error.utils';

@Injectable({
  providedIn: 'root',
})


export class WishlistService {
  http: HttpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private handleError(error: HttpErrorResponse): Observable<never> {
    
    const appError = ErrorUtils.createAppError(error);

    console.error('WishlistService Error:', appError);
    return throwError(() => appError);
    }

   getUserWishlist(): Observable<WishlistItemDTO[]> {
    const endpoint = `${this.apiUrl}/api/Wishlists/GetUserWishlist`;

    return this.http.get<WishlistItemDTO[]>(endpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
        })
      );
    } 

  checkIfInWishlist(bookId: number): Observable<boolean> {
    const endpoint = `${this.apiUrl}/api/Wishlists/CheckIfInWishlist/${bookId}`;

    return this.http.get<boolean>(endpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
        })
      );
    }

  addToWishlist(bookId: number): Observable<ApiResponse>{
    const endpoint = `${this.apiUrl}/api/Wishlists/AddToWishlist/${bookId}`;

    return this.http.post<any>(endpoint, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
        })
      );
    }

    removeFromWishlist(bookId: number): Observable<ApiResponse>{
    const endpoint = `${this.apiUrl}/api/Wishlists/RemoveFromWishlist/${bookId}`;

    return this.http.delete<any>(endpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
        })
      );
    }
  }
 

  
  
  

  

  

