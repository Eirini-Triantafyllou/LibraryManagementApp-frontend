import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-group-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './list-group-menu.html',
  styleUrl: './list-group-menu.css',
})
export class ListGroupMenu {

  menu = [
    {text:"Step 1 Person Table", link:'person-table-example'},
    {text:"Step 2 Component Input", link:'component-example'},
    {text:"Step 3 @For Directive", link:'for-directive-example'},
    {text:"Step 4 Event Bind", link:'event-bind-example'},
    {text:"Step 6 Simple Datatable", link:'simple-datatable-example'},
    {text:"Step 7 Component Output", link:'component-output-example'},
    {text:"Step 9 Reactive Forms",
      link:'reactive-form-example'},
    {text:"User Login", link:'login-example'},
    {text:"Create User", link:'create-example'}
  ]
}
