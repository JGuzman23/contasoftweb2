import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice607 } from '../interfaces/invoice607.interface';
import { InvoiceBill } from '../interfaces/bill.interface';
import { VoidInvoice } from '../interfaces/void.interface';
import { Income } from '../interfaces/income.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  http = inject(HttpClient);
  private apiUrl = environment.baseUrl;

  public header = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  public httpOptions = {
    headers: this.header,
  };
  constructor() {}

  GetMyInvoice607(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/O607/invoice607/${companyId}`);
  }
 
  createInvoice607(model: Income): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/O607/invoice607`,
      model,
      this.httpOptions
    );
  }
  updateInvoice607(model: Income): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/O607/invoice607/${model.id}`,
      model,
      this.httpOptions
    );
  }
  deleteInvoice606(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/O607/invoice607/${id}`);
  }

  GetMy607s(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/O607/${companyId}`);
  }
  Generar607(anomes:string): Observable<any> {
    var company = localStorage.getItem('company') || '';
    var jsonCompany = JSON.parse(company);
    let data={
      companyID:jsonCompany.id,
      anomes:anomes,
      rnc:jsonCompany.rnc
    }
    
    return this.http.post<any>(`${this.apiUrl}/O607`,data,this.httpOptions);
  }

  descargar607(o607id:number,formato:number): Observable<any> {
    let data={
      id:o607id,
      formato:formato
    }

    return this.http.post<any>(`${this.apiUrl}/O607/descargar`,data,this.httpOptions);
  }




  //operaciones 606



  GetMyInvoice606(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/O606/invoice606/${companyId}`);
  }
  
  createInvoice606(model: InvoiceBill): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/O606/invoice606`,
      model,
      this.httpOptions
    );
  }

  updateInvoice606(model: InvoiceBill): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/O606/invoice606/${model.id}`,
      model,
      this.httpOptions
    );
  }
  deleteInvoiceBill(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/O606/invoice606/${id}`);
  }

  GetMy606s(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/O606/${companyId}`);
  }

  Generar606(anomes:string): Observable<any> {
    var company = localStorage.getItem('company') || '';
    var jsonCompany = JSON.parse(company);
    let data={
      companyID:jsonCompany.id,
      anomes:anomes,
      rnc:jsonCompany.rnc
    }
    
    return this.http.post<any>(`${this.apiUrl}/O606`,data,this.httpOptions);
  }

  descargar606(o606id:number,formato:number): Observable<any> {
    let data={
      id:o606id,
      formato:formato
    }

    return this.http.post<any>(`${this.apiUrl}/O606/descargar/606`,data,this.httpOptions);
  }

  // operacion 608
  GetMy608s(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/O608/${companyId}`);
  }
  Generar608(anomes:string): Observable<any> {
    var company = localStorage.getItem('company') || '';
    var jsonCompany = JSON.parse(company);
    let data={
      companyID:jsonCompany.id,
      anomes:anomes,
      rnc:jsonCompany.rnc
    }
    
    return this.http.post<any>(`${this.apiUrl}/O608`,data,this.httpOptions);
  }
  anular(model:VoidInvoice): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/O608/anular`,model,this.httpOptions);
  }
 
  descargar608(o606id:number,formato:number): Observable<any> {
    let data={
      id:o606id,
      formato:formato
    }

    return this.http.post<any>(`${this.apiUrl}/O608/descargar/608`,data,this.httpOptions);
  }
}
