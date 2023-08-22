import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  loadLeagues(): Observable<any> {
    return this.http.get(`${API_URL}/league/all`,{headers:this.headers});
  }
  createLeague(league: any): Observable<any> {
    return this.http.post(`${API_URL}/league/create`, league ,{headers:this.headers});
  }
}
