import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenUserPayload, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiURL = environment.apiURL;
//   apiPath = '/hardware-store-api/v1';
  
  public currentUserSubject: BehaviorSubject<User | null>;
  public token: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {
      const storedUserJSON = localStorage.getItem('currentUser');
      const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;
      this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
  }

  public get currentUserValue(): User | null {
      return this.currentUserSubject.value;
  }

  // public register(username: string, password: string): Observable<TokenUserPayload> {
  //     return this.http.post<TokenUserPayload>(
  //         `${this.apiURL}`,
  //         { username, password }
  //     )
  //     .pipe(map((payload: TokenUserPayload) => {
  //         localStorage.setItem('token', payload.token);
  //         localStorage.setItem('currentUser', JSON.stringify(payload.user));
          
  //         this.currentUserSubject.next(payload.user);
  //         this.token = payload.token;

  //         return payload;
  //     }));
  // }

  public signin(username: string, password: string): Observable<TokenUserPayload> {
      return this.http.post<TokenUserPayload>(
          `${this.apiURL}/authentication`,
          {username, password}
      )
      .pipe(map((payload: TokenUserPayload) => {
          localStorage.setItem('token', payload.token);
          localStorage.setItem('currentUser', JSON.stringify(payload.user));
          
          this.currentUserSubject.next(payload.user);
          this.token = payload.token;

          return payload;
      }));
  }

  public signout() {
      this.currentUserSubject.next(null);
      this.token = '';
      
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
  }
}
