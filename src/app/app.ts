import { Component, signal } from '@angular/core';

// import { Navbar } from './components/navbar/navbar';
import { LoginUser } from './components/login-user/login-user';
// import { Footer } from './components/footer/footer';
// import { ReaderDashboard } from './components/reader-dashboard/reader-dashboard';
// import { LibrarianDashboard } from './components/dashboards/librarian-dashboard/librarian-dashboard';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { CreateUser } from './components/create-user/create-user';


@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    // Navbar,
    // ReaderDashboard,
    // LibrarianDashboard,
    LoginUser,
    // Footer,
    // CreateUser
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LibraryManagementApp-frontend');


  
}
