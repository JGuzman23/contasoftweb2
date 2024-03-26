import { Injectable, inject } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../components/contasoft/interfaces/user.interface';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)



  public header = new HttpHeaders({
    
    'Content-Type': 'application/json'
  })
  public httpOptions = {
    headers: this.header
  }
  constructor() { }

  private apiUrl = environment.baseUrl

  getMyUser( userId:number):Observable<any>{
    
    
    return this.http.get<any>(`${this.apiUrl}/Users/${userId}`,this.httpOptions)
   
    
  }
  getUserByCompany(userId:number, companyId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Users?userId=${userId}&companyId=${companyId}`,this.httpOptions)

  }
  createUser(user:User):Observable<any>{
  
    return this.http.post<any>(`${this.apiUrl}/Users`, user,this.httpOptions)

  }
}
