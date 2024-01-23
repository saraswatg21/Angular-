import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/api';

  //signup
  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  //login
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  //get all students records
  record(): Observable<any> {
    return this.http.get(`${this.apiUrl}/record`);
  }

  //get single student record
  getSingleData(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/student/${id}`);
  }

  //create data
  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/record`, data);
  }

  //update data
  updateData(data: any, id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/record/${id}`, data);
  }

  //delete data
  deleteData(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/record/${id}`);
  }

  //get token
  getToken() {
    return localStorage.getItem('token');
  }
}
