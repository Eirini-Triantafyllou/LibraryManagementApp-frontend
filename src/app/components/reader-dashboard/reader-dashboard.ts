import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-reader',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './reader-dashboard.html',
  styleUrl: './reader-dashboard.css',
})
export class ReaderDashboard {
  menu = [
    {text:"Τρέχουσα κατάσταση δανεισμού", link:'current-borrowed-books'},
    {text:"Αναζήτηση βιβλίων", link:'search-books'}
  ]

}
