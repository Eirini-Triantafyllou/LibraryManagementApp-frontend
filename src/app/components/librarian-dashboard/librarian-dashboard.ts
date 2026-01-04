import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-librarian-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './librarian-dashboard.html',
  styleUrl: './librarian-dashboard.css',
})
export class LibrarianDashboard {

  menu = [
    {text:"Αναζήτηση αναγνωστών", link:'search-readers'},
    {text:"Αναζήτηση βιβλίων", link:'search-books'}
  ]

}
