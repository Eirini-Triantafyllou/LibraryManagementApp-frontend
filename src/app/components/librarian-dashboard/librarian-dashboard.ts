import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-librarian-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, Navbar, Footer],
  templateUrl: './librarian-dashboard.html',
  styleUrl: './librarian-dashboard.css',
})
export class LibrarianDashboard {

  menu = [
    {text:"👤 Αναζήτηση αναγνωστών", link:'search-readers'},
    {text:"🔍 Αναζήτηση/ επεξεργασία εγγραφών", link:'search-edit-books'},
    {text:"📚  Προσθήκη εγγραφών", link:'add-books'}
  ]
}
