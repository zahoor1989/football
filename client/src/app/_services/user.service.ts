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
    return this.http.get(`${API_URL}/users/all`,{headers:this.headers});
  }

  getUserById(id:any): Observable<any> {
    return this.http.get(`${API_URL}/users/${id}`,{headers:this.headers});
  }
  deleteUser(id:any): Observable<any> {
    return this.http.post(`${API_URL}/users/delete/${id}`,{headers:this.headers});
  }

  updateUserStatus(id:any): Observable<any> {
    return this.http.post(`${API_URL}/users/update/${id}`,{headers:this.headers});
  }
  updateUser(id:any, values: any): Observable<any> {
    return this.http.post(`${API_URL}/users/update/${id}`,values, {headers:this.headers});
  }
  createUser(user:any): Observable<any> {
    return this.http.post(`${API_URL}/users/create`, user ,{headers:this.headers});
  }
  getAllRoles(): Observable<any> {
    return this.http.get(`${API_URL}/roles/all`, {headers:this.headers});
  }
}
