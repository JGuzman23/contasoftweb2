import { Injectable, inject } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class PlanService {
  http = inject(HttpClient)



  public header = new HttpHeaders({
    
    'Content-Type': 'application/json'
  })
  public httpOptions = {
    headers: this.header
  }
  constructor() { }

  private apiUrl = environment.baseUrl

  getAll( ):Observable<any>{
    
    
    return this.http.get<any>(`${this.apiUrl}/Plan`,this.httpOptions)
   
    
  }
  
}
