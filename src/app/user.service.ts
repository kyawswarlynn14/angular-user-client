// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://user-server-29ce.onrender.com/api/users';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('access_token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    this.cookieService.delete('email');
    this.cookieService.delete('access_token');
    this.router.navigate(['/login']);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getAllUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/get-all-users`, { headers });
  }

  getUserInfo(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  updateUserInfo(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(`${this.apiUrl}/update-user-info`, data, { headers });
  }

  updateUserPassword(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(`${this.apiUrl}/update-user-password`, data, { headers });
  }

  updateUserRole(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(`${this.apiUrl}/update-user-role`, data, { headers });
  }

  deleteOneUser(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/delete-one-user/${userId}`, { headers });
  }
}
