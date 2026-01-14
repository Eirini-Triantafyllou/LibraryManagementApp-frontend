import { Routes } from '@angular/router';
import { LoginUser} from './components/login-user/login-user';
import { authGuard } from './shared/guards/auth-guard';
import { roleGuard } from './shared/guards/role-guard';
import { UserRole } from './shared/enums/user-role';
import { ReaderDashboard } from './components/reader-dashboard/reader-dashboard';
import { LibrarianDashboard } from './components/librarian-dashboard/librarian-dashboard';
import { SignupUser } from './components/signup-user/signup-user';
import { UpdateUser } from './components/update-user/update-user';
import { ReaderHome } from './components/reader-home/reader-home';
import { BookSearch } from './components/book-search/book-search';
import { Wishlist } from './components/wishlist/wishlist';
import { LibrarianHome } from './components/librarian-home/librarian-home';
import { ReaderSearch } from './components/reader-search/reader-search';


export const routes: Routes = [
  {path:'login-user', component: LoginUser},
  {path:'signup-user', component: SignupUser},
  {path: 'reader-dashboard', 
   component: ReaderDashboard,
   canActivate: [authGuard, roleGuard],
    data: { requiredRole: UserRole.Reader},
   children: [
    { 
      path: '', 
      component: ReaderHome,
      pathMatch: 'full'
      },
    { 
      path: 'search-books', 
      component: BookSearch
      },  
    {
      path: 'wish-list',
      component: Wishlist
    },
    {
      path: 'update-user/:userId',
        loadComponent: () => import('./components/update-user/update-user')
          .then(m => m.UpdateUser)
    },
   ]
   },
  {path: 'librarian-dashboard', 
   component: LibrarianDashboard,               
   canActivate: [authGuard, roleGuard],
   data: { requiredRole: UserRole.Librarian},
   children: [
    { 
      path: '', 
      component: LibrarianHome,
      pathMatch: 'full'
      },
    { 
      path: 'search-readers', 
      component: BookSearch
      },  
    { 
      path: 'search-books', 
      component: ReaderSearch
      },  
    ]
  },
  // {path:'admin-dashboard',
  //   component: AdminDashboard,
  //  canActivate: [authGuard, roleGuard],    
  //  data: { requiredRole: UserRole.Admin}
  //   },
  // {path: 'unauthorized', component: Unauthorized},        // To Do
  { path: '', redirectTo: '/login-user', pathMatch: 'full' },
];
