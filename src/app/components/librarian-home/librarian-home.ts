import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-librarian-home',
  standalone: true,
  imports: [ CommonModule, RouterOutlet],
  templateUrl: './librarian-home.html',
  styleUrl: './librarian-home.css',
})
export class LibrarianHome {

}
