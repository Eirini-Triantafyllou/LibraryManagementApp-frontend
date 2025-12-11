import { Component } from '@angular/core';

@Component({
  selector: 'app-step1',
  imports: [],
  templateUrl: './step1.html',
  styleUrl: './step1.css',
})
export class Step1 {
  user = {
    firstname: 'Bob',
    lastname: 'D',
    email:'bobd@aeb.gr'
  }
}
