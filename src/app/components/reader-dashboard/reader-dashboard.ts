import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { UpdateUser } from '../update-user/update-user';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reader-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, Navbar, UpdateUser, Footer],
  templateUrl: './reader-dashboard.html',
  styleUrl: './reader-dashboard.css',
})
export class ReaderDashboard {
  menu = [
    {text:"Τρέχουσα κατάσταση δανεισμού", link:'current-borrowed-books'},
    {text:"Επιθυμητά", link: 'wish-list'},
    {text:"Αναζήτηση βιβλίων", link:'search-books'},
    {text:"Ενημέρωση στοιχείων χρήστη", link:'update-user'}
  ]
}
