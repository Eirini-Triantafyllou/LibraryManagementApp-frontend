import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, Navbar, Footer],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  menu = [
    {text:"👤 Αναζήτηση αναγνωστών", link: 'search-readers'}, 
    {text:"👤 Αναζήτηση εργαζόμενων", link: 'search-librarians'},
    {text:"🔍 Αναζήτηση/ επεξεργασία εγγραφών", link:'search-edit-books'},
    {text:"📚  Προσθήκη εγγραφών", link:'add-books'}
  ]
}
