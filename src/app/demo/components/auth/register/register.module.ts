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
    InputMaskModule
  ]
})
export class RegisterModule { }
