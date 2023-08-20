import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class TeamService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  loadTeams(): Observable<any> {
    return this.http.get(`${API_URL}/team/all`,{headers:this.headers});
  }
  getTeamsByAcademy(id:string): Observable<any> {
    return this.http.get(`${API_URL}/team/foracademy/${id}`,{headers:this.headers});
  }

  createTeam(teamData:any): Observable<any> {
    return this.http.post(`${API_URL}/team/create`,teamData, {headers:this.headers});
  }
  getTeamById(id:string): Observable<any> {
    return this.http.get(`${API_URL}/team/${id}`,{headers:this.headers});
  }
  updateTeam(id:string, teamData:any): Observable<any> {
    return this.http.post(`${API_URL}/team/update/${id}`,teamData, {headers:this.headers});
  }
}
