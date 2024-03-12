import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';
import { StyleClassModule } from 'primeng/styleclass';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [ CheckboxModule,StepsModule,ButtonModule,ToastModule,StyleClassModule,CommonModule,RadioButtonModule, FormsModule,DividerModule
    ],
  templateUrl: './plan.component.html'
})
export class PlanComponent {
  ingredient!: string;
}
