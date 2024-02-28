import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {



  http = inject(HttpClient)
  private apiUrl = environment.baseUrl

  public header = new HttpHeaders({
    
    'Content-Type': 'application/json'
  })
  public httpOptions = {
    headers: this.header
  }
  constructor() { }
//?companyId=3&fromDate=43&endDate=43&cuenta=43
  Get(companyId: number,fechadesde:string, fechaHasta:string, cuenta:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Transactions?companyId=${companyId}&fromDate=${fechadesde}&endDate=${fechaHasta}&cuenta=${cuenta}`);
  }

  create (model:Transaction): Observable<any>{

    return this.http.post<any>(`${this.apiUrl}/Transactions`, model,this.httpOptions)
      
  }
}
