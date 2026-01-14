import { Component, inject, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { UserRole } from './shared/enums/user-role';
import { DashboardService } from './shared/services/dashboard.service';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/interfaces/user';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LibraryManagementApp-frontend');

userRole: any;
user: any;
 
}
