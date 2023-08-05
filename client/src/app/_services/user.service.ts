import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + '/content', {headers:this.headers});
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + '/user', {headers:this.headers});
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + '/mod', {headers:this.headers});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + '/admin', {headers:this.headers});
  }
  loadUsers(): Observable<any> {
    debugger
    return this.http.get(`${API_URL}/users/all`,{headers:this.headers});
  }
}
