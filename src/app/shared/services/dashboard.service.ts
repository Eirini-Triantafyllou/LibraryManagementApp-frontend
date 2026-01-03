import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../enums/user-role';
import { UserReadOnlyDTO } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private authService = inject(AuthService);
  private router = inject(Router);

 
  getUserRoleString(): string {
  const user = this.authService.currentUser();
  
  if (!user || user.userRole == null) {
    return '';
  }
  
  const role = user.userRole;
  
  if (typeof role === 'number') {
    if (role === 0) return 'Reader';
    if (role === 1) return 'Librarian';
    if (role === 2) return 'Admin';

  } else if (typeof role === 'string') {
     if (role === 'Reader') return 'Reader';
    if (role === 'Librarian') return 'Librarian';
    if (role === 'Admin') return 'Admin';
  }

  return 'Reader'; // Default
}

  // Παίρνει το σωστό dashboard path για τον τρέχοντα χρήστη
  getUserDashboardPath(): string {
    const user = this.authService.currentUser();
    
    if (!user) {
      return '/login-user';
    }

    switch(user.userRole) {
      case UserRole.Reader:
        return '/reader-dashboard';
      case UserRole.Librarian:
        return '/librarian-dashboard';
      case UserRole.Admin:
        return '/admin-dashboard';
      default:
        return '/unauthorized';
    }
  }

  // Κάνει redirect στο σωστό dashboard
  redirectToUserDashboard(user?: UserReadOnlyDTO): void {
    const role = user?.userRole?.toString() || 'Reader';
    
    switch(role) {
      case 'Admin':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'Librarian':
        this.router.navigate(['/librarian-dashboard']);
        break;
      case 'Reader':
        this.router.navigate(['/reader-dashboard']);
        break; 
      default:
        this.router.navigate(['/reader-dashboard']);
    }
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
