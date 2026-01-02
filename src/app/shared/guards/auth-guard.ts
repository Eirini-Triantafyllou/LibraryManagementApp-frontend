import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const userService = inject(UserService);
//   const router = inject(Router);

//   if (userService.user()  && !userService.isTokenExpired()) {
//     return true
//   }
//   return router.navigate(['login-example']);
// };

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) 
    return true;
  
  // Redirect to login
  router.navigate(['/login-user']);
  return false;
}