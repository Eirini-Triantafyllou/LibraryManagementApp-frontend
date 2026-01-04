import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../enums/user-role';
import { DashboardService } from '../services/dashboard.service';


export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const dashboardService = inject(DashboardService);

// ΈΛΕΓΧΟΣ ΑΝ ΕΙΝΑΙ LOGGED IN/ AUTHENTICATED (θα έχει περάσει ήδη από authGuard)
  if (!authService.isAuthenticated()) {
    return false;
  }

// ΕΛΕΓΧΟΣ ΑΝ ΖΗΤΕΊΤΑΙ ΣΥΓΚΕΚΡΙΜΕΝΟ ROLE
  const requiredRole = route.data?.['requiredRole'] as UserRole;

 // ΕΛΕΓΧΟΣ ΑΝ Ο ΧΡΗΣΤΗΣ ΕΧΕΙ ΤΟΝ ΑΠΑΙΤΟΥΜΕΝΟ ROLE
  if (authService.hasRole(requiredRole)) {
    return true;
  }

  // ΑΝ ΔΕΝ ΕΧΕΙ ΤΟΝ ΣΩΣΤΟ ROLE, REDIRECT ΣΤΟ DASHBOARD ΤΟΥ
  dashboardService.redirectToUserDashboard();
  return false;
};  

