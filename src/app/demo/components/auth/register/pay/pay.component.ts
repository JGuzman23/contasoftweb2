import { Component } from '@angular/core';
import { PaypalService } from './paypal.service';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [],
  templateUrl: './pay.component.html',
})
export class PayComponent {

  constructor(private paypalService: PaypalService) { }

  ngOnInit(): void {
    this.paypalService.initPaypalButton();
  }
}
