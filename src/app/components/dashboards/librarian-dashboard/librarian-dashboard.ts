import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-librarian-dashboard',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './librarian-dashboard.html',
  styleUrl: './librarian-dashboard.css',
})
export class LibrarianDashboard {

  menu = [
    {text:"Αναζήτηση αναγνωστών", link:'search-readers'},
    {text:"Αναζήτηση βιβλίων", link:'search-books'}
  ]

}
