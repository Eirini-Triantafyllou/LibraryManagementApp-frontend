import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../enums/user-role';
import { DashboardService } from '../services/dashboard.service';

// export const adminRoleGuard: CanActivateFn = (route, state) => {
//   const userService = inject(UserService);
//   const router = inject(Router);

//   // const userRoles: UserRole[] | undefined = userService.user()?.roles;
//   const currentUser = userService.user();
//   const userRole: UserRole | undefined = currentUser?.roles;
//   // const hasPermission === UserRole.ADMIN && userRole?.active;
//   // const hasPermision = userRole?((r:UserRole) => r.role ==='ADMIN' && r.active);  //να το ξαναδω

//   // if(userService.user() && hasPermision) {
//   //   return true;                                  // και αυτό να το ξαναδω
//   // }

//   return router.navigate(['welcome']);
// };



export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const dashboardService = inject(DashboardService);

  // Παίρνουμε το required role από τα data του route
  // const requiredRole = route.data?.['requiredRole'] as UserRole;

  // if (!requiredRole) {
  //   console.error('No required role specified in route data');
  //   router.navigate(['/unauthorized']);
  //   return false;
  // }

  // if (authService.isAuthenticated() && authService.hasRole(requiredRole)) {
  //   return true;
  // } else {
  //   router.navigate(['/login-user'])
  // }
  // return false;

// 1. ΈΛΕΓΧΟΣ ΑΝ ΕΙΝΑΙ LOGGED IN/ AUTHENTICATED (θα έχει περάσει ήδη από authGuard)
  if (!authService.isAuthenticated()) {
    return false;
  }

// 2. ΕΛΕΓΧΟΣ ΑΝ ΖΗΤΕΊΤΑΙ ΣΥΓΚΕΚΡΙΜΕΝΟ ROLE
  const requiredRole = route.data?.['requiredRole'] as UserRole;

 // 3. ΕΛΕΓΧΟΣ ΑΝ Ο ΧΡΗΣΤΗΣ ΕΧΕΙ ΤΟΝ ΑΠΑΙΤΟΥΜΕΝΟ ROLE
  if (authService.hasRole(requiredRole)) {
    return true;
  }

  // 4. ΑΝ ΔΕΝ ΕΧΕΙ ΤΟΝ ΣΩΣΤΟ ROLE, REDIRECT ΣΤΟ DASHBOARD ΤΟΥ
  dashboardService.redirectToUserDashboard();
  return false;
};  

