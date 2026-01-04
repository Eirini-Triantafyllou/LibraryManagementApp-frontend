import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { UpdateUserReaderDTO, UserReadOnlyDTO } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  private apiUrl = environment.apiUrl;

  updateUser(data:UpdateUserReaderDTO): Observable<UserReadOnlyDTO>
  {
    const endpoint = `${this.apiUrl}/api/Users/UpdateUser{userId}`;
    return this.http.put<UserReadOnlyDTO>(endpoint, data);
  }
  
}
