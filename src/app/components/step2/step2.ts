import { Component, Input } from '@angular/core';
import { Person } from '../../shared/interfaces/person';

@Component({
  selector: 'app-step2',
  imports: [],
  templateUrl: './step2.html',
  styleUrl: './step2.css',
})
export class Step2 {
  @Input() person: Person | undefined;

}
