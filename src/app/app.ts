import { Component } from '@angular/core';
import { Step1 } from './components/step1/step1';
import { Step2 } from './components/step2/step2';
import { Step3 } from './components/step3/step3';
import { Step4EventBind } from './components/step4-event-bind/step4-event-bind';

import { Navbar } from './components/navbar/navbar';
import { Welcome } from './components/welcome/welcome';
import { Footer } from './components/footer/footer';
// import { ListGroupMenu } from './components/list-group-menu/list-group-menu';
// import { ReaderDashboard } from './components/reader-dashboard/reader-dashboard';
// import { LibrarianDashboard } from './components/dashboards/librarian-dashboard/librarian-dashboard';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Person } from './shared/interfaces/person';
import { PersonReactiveForms } from "./components/step9-reactive-forms/person-reactive-forms/person-reactive-forms";


@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    Navbar,
    // ListGroupMenu,
    // ReaderDashboard,
    // LibrarianDashboard,
    Welcome,
    Footer,
    Step1,
    Step2,
    Step3,
    Step4EventBind,
    PersonReactiveForms
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('LibraryManagementApp-frontend');

  doNotShowRest: boolean = true;

  //Step 2 inpt component
  person1:Person = {
    firstname: 'User1 name',
    lastname: 'User1 lastname',
    email: 'User1@aeb.gr'
  }

  person2: Person = {
    firstname: 'User2 name',
    lastname: 'User2 lastname',
    email: 'User2@aeb.gr'
  }
}
