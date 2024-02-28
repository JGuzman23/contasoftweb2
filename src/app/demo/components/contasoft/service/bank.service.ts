import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../interfaces/bank.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  http = inject(HttpClient)
  private apiUrl = environment.baseUrl

  public header = new HttpHeaders({
    
    'Content-Type': 'application/json'
  })
  public httpOptions = {
    headers: this.header
  }
  constructor() { }

  async Get(companyId: number): Promise<Observable<any>> {
    return this.http.get<any>(`${this.apiUrl}/Bank/${companyId}`);
  }
  GetAllBanks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Bank`);
  }
  GetMyBanks(companyId:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Bank/${companyId}`);
  }
  
  asingnar (model:Bank): Observable<any>{

    return this.http.post<any>(`${this.apiUrl}/bank`, model,this.httpOptions)
      
  }

  updateMyBank( updatedData: Bank): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Bank/${updatedData.bankSelectedID}`, updatedData);
  }

  deleteMyBank(companyId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Bank/${companyId}`);
  }
  getCurrency(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Currency`);
  }
}
