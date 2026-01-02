import { Routes } from '@angular/router';
import { LoginUser} from './components/login-user/login-user';
// import { CreateUser } from './components/create-user/create-user';
import { authGuard } from './shared/guards/auth-guard';
import { roleGuard } from './shared/guards/role-guard';
import { UserRole } from './shared/enums/user-role';
import { ReaderDashboard } from './components/reader-dashboard/reader-dashboard';
import { LibrarianDashboard } from './components/dashboards/librarian-dashboard/librarian-dashboard';


export const routes: Routes = [
  {path:'login-user', component: LoginUser},
  {path: 'reader/dashboard', 
   component: ReaderDashboard,
   canActivate: [authGuard, roleGuard] ,
   data: { requiredRole: UserRole.Reader}
   },
  {path: 'librarian-dashboard', 
   component: LibrarianDashboard,               
   canActivate: [authGuard, roleGuard],
   data: { requiredRole: UserRole.Librarian}
    },
  // {path:'admin-dashboard',
  //   component: AdminDashboard,
  //  canActivate: [authGuard, roleGuard],    
  //  data: { requiredRole: UserRole.Admin}
  //   },
  // {path: 'unauthorized', component: Unauthorized},        // To Do
  { path: '', redirectTo: '/login-user', pathMatch: 'full' },
];
