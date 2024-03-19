import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { render } from 'creditcardpayments/creditCardPayments';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PaypalReturn } from '../Interfaces/paypal.interface';
import { UserRegisterService } from '../userRegister.service';
@Component({
    selector: 'app-pay',
    standalone: true,
    imports: [StyleClassModule, CommonModule,ButtonModule],
    templateUrl: './pay.component.html',
})
export class PayComponent {
    constructor(private router: Router, private UserRegister: UserRegisterService) {}
    public PaypalRetorn:PaypalReturn
   

    prevPage() {
        this.router.navigate(['register/Plan']);
    }

    ngOnInit(): void {
        render({
            id: '#myPaypalButtons',
            currency: 'DOP',
            value: '100.00',
            onApprove: (details) => {
                this.PaypalRetorn = details

                console.log(this.PaypalRetorn);
                this.UserRegister.sendPayInformations(this.PaypalRetorn);
              //  this.router.navigate(['register/Confirmacion']);
            },
        });
    }
}
