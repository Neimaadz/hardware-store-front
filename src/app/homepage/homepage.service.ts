import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomepageImages } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getWelcomeImages(): Observable<HomepageImages[]>{
    return this.http
      .get<HomepageImages[]>(`${this.apiURL}/welcomeImages`);
  }

  getNewsImages(): Observable<HomepageImages[]>{
    return this.http
      .get<HomepageImages[]>(`${this.apiURL}/newsImages`);
  }



}
