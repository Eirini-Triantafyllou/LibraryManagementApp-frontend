import { Component } from '@angular/core';
import { Person } from '../../shared/interfaces/person';
import { Step2 } from '../step2/step2';

@Component({
  selector: 'app-step3',
  imports: [Step2],
  templateUrl: './step3.html',
  styleUrl: './step3.css',
})
export class Step3 {

  person: Person[] = [
    {"firstname":"Margareta","lastname":"Scneider","email":"mscneider0@sohu.com"},
    {"firstname":"Eba","lastname":"Leisman","email":"eleisman1@woothemes.com"},
    {"firstname":"Aloise","lastname":"Branthwaite","email":"abranthwaite2@tumblr.com"},
    {"firstname":"Cassey","lastname":"Mulvey","email":"cmulvey3@prweb.com"},
    {"firstname":"Garrot","lastname":"Fellini","email":"gfellini4@spotify.com"},
    {"firstname":"Sheff","lastname":"Pedrazzi","email":"spedrazzi5@cloudflare.com"},
    {"firstname":"Wendeline","lastname":"Weddeburn - Scrimgeour","email":"wweddeburnscrimgeour6@hp.com"},
    {"firstname":"Kyle","lastname":"Shevelin","email":"kshevelin7@live.com"},
    {"firstname":"Gayler","lastname":"Arpur","email":"garpur8@virginia.edu"},
    {"firstname":"Gunther","lastname":"Hambrook","email":"ghambrook9@oaic.gov.au"},
    {"firstname":"Mischa","lastname":"Cowerd","email":"mcowerda@usda.gov"},
    {"firstname":"Gennifer","lastname":"Tesoe","email":"gtesoeb@vistaprint.com"},
    {"firstname":"Pippo","lastname":"Keenan","email":"pkeenanc@ed.gov"},
    {"firstname":"Cordie","lastname":"Mucci","email":"cmuccid@sun.com"},
    {"firstname":"Ulric","lastname":"Forsbey","email":"uforsbeye@deliciousdays.com"},
    {"firstname":"Ronni","lastname":"Lishman","email":"rlishmanf@meetup.com"},
    {"firstname":"Rosmunda","lastname":"Fortoun","email":"rfortoung@diigo.com"},
    {"firstname":"Gonzales","lastname":"McMorran","email":"gmcmorranh@deliciousdays.com"},
    {"firstname":"Tymothy","lastname":"Cowdery","email":"tcowderyi@kickstarter.com"},
    {"firstname":"Earlie","lastname":"Boatwright","email":"eboatwrightj@pbs.org"}]
}
