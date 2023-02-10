import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../pages/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://127.0.0.1:8000/api'

  constructor(private httpClient: HttpClient) { }

  register(name: string, email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.API_URL}/register`, {
      name,
      email, 
      password
    })
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.API_URL}/login`, {
      email, 
      password
    })
  }
}
