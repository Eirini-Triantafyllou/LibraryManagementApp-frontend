import { Component, inject, signal } from '@angular/core';

import { LoginUser } from './components/login-user/login-user';
import { Footer } from './components/footer/footer';
import { ReaderDashboard } from './components/reader-dashboard/reader-dashboard';
import { LibrarianDashboard } from './components/librarian-dashboard/librarian-dashboard';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserRole } from './shared/enums/user-role';
import { DashboardService } from './shared/services/dashboard.service';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { UpdateUser } from './components/update-user/update-user';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    Navbar,
    ReaderDashboard,
    LibrarianDashboard,
    LoginUser,
    Footer,
    UpdateUser
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LibraryManagementApp-frontend');

userRole: any;
user: any;


  
}
