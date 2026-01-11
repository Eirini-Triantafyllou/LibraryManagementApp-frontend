import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { WishlistService } from '../../shared/services/wishlist.service';
import { WishlistItemDTO } from '../../shared/interfaces/wishlist';
import { AppError, ApiResponse } from '../../shared/interfaces/errors';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatChipsModule,
    MatSnackBarModule 
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  wishlistService = inject(WishlistService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  
  loading = false;
  errorMessage = '';

  wishlistItems: WishlistItemDTO[] = [];

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.loading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    const subscription = this.wishlistService.getUserWishlist()
      .subscribe({
        next: (items) => {
          this.wishlistItems = items;
          this.loading = false;
          this.cdr.detectChanges();

          if (items.length === 0) {
            this.showSnackbar('Η λίστα επιθυμητών σας είναι άδεια. Προσθέστε βιβλία', 'info');
          }
        },
        error: (error: AppError) => {
          this.handleLoadError(error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
  }

   private handleLoadError(error: AppError): void {
    switch (error.status) {
      case 401:
        this.errorMessage = 'Παρακαλώ συνδεθείτε για να δείτε τη λίστα επιθυμητών σας.';
        this.showSnackbar('Η σύνδεσή σας έχει λήξει.', 'error');
        break;
        
      case 403:
        this.errorMessage = 'Δεν έχετε δικαιώματα για πρόσβαση στη λίστα επιθυμητών.';
        this.showSnackbar('Άρνηση πρόσβασης.', 'error');
        break;
        
      case 404:
        if (error.code === 'user_not_found') {
          this.errorMessage = 'Δεν βρέθηκε ο λογαριασμός σας.';
          this.showSnackbar('Πρόβλημα με τον λογαριασμό.', 'warning');
        } else {
          this.errorMessage = error.userMessage || 'Η λίστα επιθυμητών δεν βρέθηκε.';
        }
        break;
        
      default:
        this.errorMessage = error.userMessage || 'Αποτυχία φόρτωσης της λίστας επιθυμητών.';
    }
  }

  removeFromWishlist(item: WishlistItemDTO): void {
  if (!confirm(`Διαγραφή "${item.title}";`)) return;
  
  this.wishlistService.removeFromWishlist(item.id).subscribe({
    next: () => {
      this.wishlistItems = this.wishlistItems.filter(i => i.id !== item.id);
      this.cdr.detectChanges();
      this.snackBar.open('Αφαιρέθηκε!', 'OK', { duration: 2000 });
    },
    error: (error) => {
      this.cdr.detectChanges();
      this.snackBar.open('Σφάλμα: ' + error.userMessage, 'Κλείσιμο');
      }
    });
  }

  addToWishlist(bookId: number, bookTitle: string): void {
    this.wishlistService.addToWishlist(bookId)
      .subscribe({
        next: (response: ApiResponse) => {
          this.showSnackbar(
            response.message || `Το βιβλίο "${bookTitle}" προστέθηκε!`, 'success'
          );
        this.loadWishlist();
      },
      error: (error: AppError) => {
        if (error.code === 'book_already_in_wishlist') {
         this.showSnackbar('Αυτό το βιβλίο είναι ήδη στη λίστα!', 'info');
          } else {
            this.showSnackbar(error.userMessage || 'Αποτυχία προσθήκης.', 'error');
          }
        }
      });
    }

  private showSnackbar(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
      const panelClass = `snackbar-${type}`;
    const duration = type === 'error' ? 5000 : 3000;
    
    this.snackBar.open(message, 'Κλείσιμο', {
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }

  trackByWishlistId(index: number, item: WishlistItemDTO): number {
    return item.id;
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('el-GR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

} 
