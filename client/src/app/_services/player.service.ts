import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private fileHeaders = new HttpHeaders().set('Content-Type', 'multipart/form-data');

  constructor(private http: HttpClient) {}

  loadPlayers(): Observable<any> {
    return this.http.get(`${API_URL}/player/all`,{headers:this.headers});
  }
  approvePlayer(id:any, data: any): Observable<any> {
    return this.http.post(`${API_URL}/player/approve/${id}`, data, {headers:this.headers});
  }
  getPlayerById(id: any): Observable<any> {
    return this.http.get(`${API_URL}/player/academy/${id}`, {headers:this.headers});
  }
  upload(file: File): Observable<any> {
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append("file", file);
    return this.http.post(`${API_URL}/player/upload`, formData);
  }

  getListFiles(): Observable<any> {
    return this.http.get(`${API_URL}/player/getuploads`, { headers:this.headers });
  }

  getFile(id:string): Observable<any> {
    return this.http.get(`${API_URL}/player/getuploads/${id}`, { headers:this.headers });
  }
  createPlayer(player: any): Observable<any> {
    return this.http.post(`${API_URL}/player/create`, player, { headers:this.headers });
  }
  getPlayerbyEmirateId(id:any): Observable<any> {
    return this.http.get(`${API_URL}/player/${id}`, {headers:this.headers});
  }
  getPlayerByTeamId(id:any): Observable<any> {
    return this.http.get(`${API_URL}/player/team/${id}`, {headers:this.headers});
  }
}
