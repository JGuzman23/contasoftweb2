import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { RegisterComponent } from './register.component';
import { InputMaskModule } from 'primeng/inputmask';
import { RouterModule } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { PayComponent } from './pay/pay.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PersonalComponent } from './personal/personal.component';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule,
        ProgressSpinnerModule,
        StepsModule,
        DividerModule,
        InputMaskModule,
        RouterModule.forChild([
            {
				path: '', component: RegisterComponent, children: [
                { path: 'register', redirectTo: 'personal' },
            { path: 'Personal', component: PersonalComponent },
            { path: 'Plan', component: PlanComponent },
            { path: 'Pago', component: PayComponent },
            { path: 'Confirmacion', component: ConfirmationComponent },
                ]}
        ]),
    ],
})
export class RegisterModule {}
