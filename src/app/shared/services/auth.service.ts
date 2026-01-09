import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserLoginDTO, JwtTokenDTO, User, UserReadOnlyDTO, UserSignupDTO } from '../interfaces/user';
import { environment } from '../../../environments/environment';
import { UserRole } from '../enums/user-role';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http:HttpClient = inject(HttpClient);
  router = inject(Router);

  private apiUrl = environment.apiUrl;         // 'https://localhost:5001'
  
  currentUserSignal = signal<User | null>(null);
  authTokenSignal = signal<string | null>(null);

  currentUser = this.currentUserSignal.asReadonly();
  authToken = this.authTokenSignal.asReadonly();
  isAuthenticated = computed(() => !!this.currentUserSignal());                          // !!{...} → !false → true

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  login(loginData: UserLoginDTO): Observable<JwtTokenDTO> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const endpoint = `${this.apiUrl}/api/Users/LoginUser`;

    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    });

    return this.http.post<JwtTokenDTO>(endpoint, loginData, {
      headers,
      withCredentials: true
    }).pipe(
    tap(response => {
      console.log('Login response:', response);

      if (response?.token && response?.user) {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    // ΑΝΤΙΓΡΑΦΗ: Μετατροπή του UserReadOnlyDTO σε User
    const user: User = this.adaptToUser(response.user);
    
    // Ενημέρωση signals
    this.authTokenSignal.set(response.token);
    this.currentUserSignal.set(user);
    
    console.log('Data saved to localStorage');
      }
    }),
    catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        this.handleError(error);
        return throwError(() => error);
      }),
    finalize(() => {
      this.isLoading.set(false);
      console.log('Login request completed');
      })
    );
  }


  signUpUser(data:UserSignupDTO): Observable<UserReadOnlyDTO> {
    const endpoint = `${this.apiUrl}/api/Users/SignUpUser`;
    return this.http.post<UserReadOnlyDTO>(endpoint, data);   
    }


  // Βοηθητική μέθοδος για μετατροπή UserReadOnlyDTO σε User
  private adaptToUser(dto: UserReadOnlyDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      username: dto.username,
      userRole: dto.userRole,
      firstname: dto.firstname,
      lastname: dto.lastname,
      // Default τιμή password field
      password: '',
      address: '',
      phoneNumber: ''
    };
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  private extractUserFromToken(token: string): User | null {
  const decoded = this.decodeToken(token);
  if (!decoded) return null;
  
  return {
    id: decoded.sub || decoded.id || 0,
    username: decoded.username || decoded.email || '',
    email: decoded.email || '',
    password: decoded.password || '',
    userRole: decoded.role || decoded.userRole || UserRole.Reader, // Default to Reader
    firstname: decoded.given_name || decoded.firstName || '',
    lastname: decoded.family_name || decoded.lastName || '',
    address: decoded.address || '',
    phoneNumber: decoded.phoneNumber || ''
  };
}

  private saveAuthData(token: string, keepLoggedIn: boolean): void {
    const storage = keepLoggedIn ? localStorage : sessionStorage;
    storage.setItem('auth_token', token);

    const user = this.currentUserSignal();
    if (user) {
      storage.setItem('user_data', JSON.stringify(user));
    }
  }

  isLoggedIn(): boolean {
      return localStorage.getItem('authToken') ? true : false;
    }

  async autoLogin(): Promise<boolean> {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    if (!token) {
      console.log('No token found');
      return false;
    }

    try {
      // 1. Έλεγχος expiry
      if (this.isTokenExpired(token)) {
        console.log('Token expired');
        this.logout();
        return false;
      }
      
      // 2. Αποθήκευση token
      this.authTokenSignal.set(token);
      
      // 3. Διάβασε user από local storage
      const userData = localStorage.getItem('user');
      
      if (userData) {
        // 3α. Αν υπάρχει saved user data
        const dto: UserReadOnlyDTO = JSON.parse(userData);
            const user: User = this.adaptToUser(dto);
            this.currentUserSignal.set(user);
            console.log('Auto-login from saved user data');
        return true;
      } else {
        // 3β. Αλλιώς εξαγωγή από token
        const user = this.extractUserFromToken(token);
        if (user) {
          this.currentUserSignal.set(user);
          console.log('Auto-login from token extraction');
          return true;
        }
        
        console.log('Cannot extract user from token');
        return false;
      }
    } catch (error) {
      console.error('Auto-login error:', error);
      this.logout();
      return false;
    }
  }

  getCurrentUserId(): string {
      //από signal
  const userFromSignal = this.currentUserSignal();
  if (userFromSignal?.id) {
    return userFromSignal.id.toString();
  }
  
  //από localStorage
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user?.id?.toString() || '';
    } catch {
      return '';
    }
  }
  // Fallback
  return '';
  }

  logout(): void {
      this.authTokenSignal.set(null);
      this.currentUserSignal.set(null);
      this.errorMessage.set(null);

      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('user');

      // this.router.navigate(['Users/LoginUser'])   
      this.router.navigate(['/login-user']);
    }

  private getUserProfile(token: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/Users/Profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));

      if (!decoded.exp) return false;

      const expiryTime = decoded.exp * 1000;
      return Date.now() >= expiryTime;
       } catch (error) {
        return true;
        }
    }

     // Utility methods για authorization
  hasRole(role: UserRole): boolean {
    const user = this.currentUserSignal();
    const userRole = Number(user?.userRole);
    return userRole === role;
  }

  isAdmin(): boolean {
    return this.hasRole(UserRole.Admin);
  }

  isLibrarian(): boolean {
    return this.hasRole(UserRole.Librarian);
  }
  
  isReader(): boolean {
    return this.hasRole(UserRole.Reader);
  }

  private handleError(error: any): void {
    console.error('Auth Service Error:', error);
    
    // Δημιουργία Map με τα error messages
  const errorMessages = new Map<number | string, string>([
    [0, 'Cannot connect to server. Please check your internet connection.'],
    [401, 'Invalid username or password'],
    [403, 'You do not have permission to perform this action'],
    [404, 'Resource not found'],
    [409, 'User already exists'],
    [429, 'Too many requests. Please try again later.'],
    [500, 'Server error. Please try again later']
  ]);

  const userMessage = errorMessages.get(error.status) || 'An unexpected error occurred';

  this.errorMessage.set(userMessage);
  }
}
