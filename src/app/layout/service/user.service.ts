import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {



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
  Get(userID:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Users/${userID}`);
  }

}
