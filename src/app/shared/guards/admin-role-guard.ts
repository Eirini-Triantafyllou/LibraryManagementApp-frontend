import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserRole } from '../interfaces/user';
import { UserRoleEnum } from '../enums/user-role-enum';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  // const userRoles: UserRole[] | undefined = userService.user()?.roles;
  const currentUser = userService.user();
  const userRole: UserRole | undefined = currentUser?.roles;
  const hasPermission = userRole?.role === UserRoleEnum.ADMIN && userRole?.active;
  // const hasPermision = userRoles?.some((r:UserRole) => r.role ==='ADMIN' && r.active);

  if(userService.user() && hasPermission) {
    return true;
  }

  return router.navigate(['welcome']);
};
