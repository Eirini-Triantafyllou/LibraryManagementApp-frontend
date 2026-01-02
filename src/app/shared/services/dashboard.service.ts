import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../enums/user-role';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Παίρνει το σωστό dashboard path για τον τρέχοντα χρήστη
  getUserDashboardPath(): string {
    const user = this.authService.currentUser();
    
    if (!user) {
      return '/login-user';
    }

    switch(user.userRole) {
      case UserRole.Reader:
        return '/reader/dashboard';
      case UserRole.Librarian:
        return '/librarian/dashboard';
      case UserRole.Admin:
        return '/admin/dashboard';
      default:
        return '/unauthorized';
    }
  }

  // Κάνει redirect στον σωστό dashboard
  redirectToUserDashboard(): void {
    const path = this.getUserDashboardPath();
    this.router.navigate([path]);
  }

  /**
   * Επιστρέφει το dashboard component ανάλογα με το role
   */
  getUserDashboardComponent(): string {
    const user = this.authService.currentUser();
    
    if (!user) {
      return 'LoginComponent';
    }

    switch(user.userRole) {
      case UserRole.Reader:
        return 'ReaderDashboardComponent';
      case UserRole.Librarian:
        return 'LibrarianDashboardComponent';
      case UserRole.Admin:
        return 'AdminDashboardComponent';
      default:
        return 'UnauthorizedComponent';
    }
  }
  
}
