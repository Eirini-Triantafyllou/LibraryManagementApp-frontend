import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reader-search',
  standalone: true,
  imports: [ CommonModule, RouterOutlet],
  templateUrl: './reader-search.html',
  styleUrl: './reader-search.css',
})
export class ReaderSearch {

}
