import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../enums/user-role';


export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return false;
  }

// check if particular role is required
  const requiredRole = route.data?.['requiredRole'] as UserRole;

  if (!requiredRole) {
    console.log('Role Guard: No required role specified, allowing access');
    return true;
  }

  // check if user has required role
  const user = authService.currentUserSignal();

  if (authService.hasRole(requiredRole)) {
    console.log('Role Guard: Access granted');
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};  

