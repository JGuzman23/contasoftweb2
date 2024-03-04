import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartService {



  http = inject(HttpClient)
  private apiUrl = environment.baseUrl

  public header = new HttpHeaders({
    
    'Content-Type': 'application/json'
  })
  public httpOptions = {
    headers: this.header
  }
  constructor() { }
 
  GetAll(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/charts/${companyId}`);
  }

 
}
