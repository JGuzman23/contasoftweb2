import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  http = inject(HttpClient)
  private apiUrl = environment.baseUrl

  public header = new HttpHeaders({
    
    'Content-Type': 'application/json'
  })
  public httpOptions = {
    headers: this.header
  }
  constructor() { }

  Get(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/company?userID=${id}`);
  }

  create (model:Company): Observable<any>{

    return this.http.post<any>(`${this.apiUrl}/company`, model,this.httpOptions)
      
  }
}
