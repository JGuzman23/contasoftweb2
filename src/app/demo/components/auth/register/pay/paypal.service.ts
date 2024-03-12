import { Injectable } from '@angular/core';
import { PayPalScriptLoader } from '@paypal/sdk-client';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private paypalScriptLoader: PayPalScriptLoader) { }

  async initPaypalButton(): Promise<void> {
    await this.paypalScriptLoader.loadPayPalSDK();
    const paypal = (window as any).paypal;
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '1.00'
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  }
}
