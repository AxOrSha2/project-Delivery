import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url_api = 'http://127.0.0.1:4000/api/v1/users';

  constructor(
    private http: HttpClient
  ) { }

  singUp(user: User): Observable<any> {
    return this.http.post(`${this.url_api}/sing-up`, user)
  }

  singIn(user: User): Observable<any> {
    return this.http.post(`${this.url_api}/sing-in`, user)
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token')
  }

}
