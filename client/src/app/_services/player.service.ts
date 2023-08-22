import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  loadPlayers(): Observable<any> {
    return this.http.get(`${API_URL}/player/all`,{headers:this.headers});
  }
  approvePlayer(id:any, data: any): Observable<any> {
    return this.http.post(`${API_URL}/player/approve/${id}`, data, {headers:this.headers});
  }
}
