import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { StyleClassModule } from 'primeng/styleclass';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [StyleClassModule,CommonModule,],
  templateUrl: './pay.component.html',
})
export class PayComponent {

  constructor() { 
    
  }

  ngOnInit(): void {
    render(
      {
        id:"#myPaypalButtons",
        currency:"USD",
        value:"100.00",
        onApprove: (details)=>{
          alert("Transaccion extitosa")
        }
      }
    )
  }
}
