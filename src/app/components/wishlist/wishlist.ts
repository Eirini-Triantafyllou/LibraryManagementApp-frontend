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
import { Book } from '../../shared/interfaces/book';

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
          this.errorMessage = error.userMessage;
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
  }

  removeFromWishlist(item: WishlistItemDTO): void {
  if (!confirm(`Διαγραφή "${item.title}";`)) return;
  
  this.wishlistService.removeFromWishlist(item.id).subscribe({
    next: () => {
      this.wishlistItems = this.wishlistItems.filter(i => i.id !== item.id);
      this.cdr.detectChanges();
      this.showSnackbar('Αφαιρέθηκε!', 'success');
    },
    error: (error: AppError) => {
      this.cdr.detectChanges();
      this.showSnackbar(error.userMessage, 'error');
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
          this.showSnackbar(error.userMessage, 'error');
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
