import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-reader-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, Navbar, Footer],
  templateUrl: './reader-dashboard.html',
  styleUrl: './reader-dashboard.css',
})

export class ReaderDashboard {
  authService = inject(AuthService);

  menu = [
    { text: "📚 Τρέχουσα κατάσταση δανεισμού", link: 'current-borrowed-books' },
    { text: "🔍 Αναζήτηση βιβλίων", link: 'search-books' },
    { text: "⭐ Επιθυμητά", link: 'wish-list' },
    { text: "👤 Ενημέρωση στοιχείων χρήστη...", link: '#' }
  ];
  
  ngOnInit(): void {
    console.log('OnInit - Checking for user...');
    
    // loading AuthService
    setTimeout(() => {
      this.loadUserId();
    }, 500);
  }
  
  private loadUserId(): void {
    const userId = this.authService.getCurrentUserId();
    console.log('Loaded User ID:', userId);
    
    if (userId) {
      // Ενημέρωση update link μόνο
      this.menu[3] = { 
        text: "👤 Ενημέρωση στοιχείων χρήστη", 
        link: `update-user/${userId}`
      };
    } else {
      console.warn('No user ID found after waiting');
      // Fallback για debugging
      this.menu[3] = { 
        text: "👤 Ενημέρωση (Demo)", 
        link: 'update-user/demo-123' 
      };
    }
  }
}
