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
import { Route, Router } from '@angular/router';
import { PlanService } from 'src/app/demo/service/plan.service';
import { Plan } from '../../../contasoft/interfaces/plan.interface';
import { UserRegisterService } from '../userRegister.service';

@Component({
    selector: 'app-plan',
    standalone: true,
    imports: [
        CheckboxModule,
        StepsModule,
        ButtonModule,
        ToastModule,
        StyleClassModule,
        CommonModule,
        RadioButtonModule,
        FormsModule,
        DividerModule,
    ],
    templateUrl: './plan.component.html',
    styles:[
      `
      .selected-card {
       border: 2px solid blue !important; /* Utiliza el color y grosor de borde que prefieras */
}`
    ]
})
export class PlanComponent {
    ingredient!: string;

    accountTypes = [
        {
            name: 'Básico',
            value: 'BASIC',
            savings: 'Save 20%',
            price: '19$ / Month',
        },
        {
            name: 'Premium',
            value: 'PREMIUM',
            savings: 'Save 25%',
            price: '29$ / Month',
        },
        {
            name: 'Empresarial',
            value: 'ENTERPRISE',
            savings: 'Save 50%',
            price: '39$ / Month',
        },
    ];

    SelecctedPlan = 3;

      public plans: Plan[]=[]
    constructor(private router: Router, private planService: PlanService,private UserRegister: UserRegisterService) {}
    ngOnInit() {
        this.planService.getAll().subscribe(
            (respose) => {
              this.plans = respose.data
            },
            (error) => {}
        );
    }
    selectAccountType(id: number) {
        this.SelecctedPlan= id
        
    }

    nextPage() {
        this.UserRegister.sendPlan(this.SelecctedPlan)
        this.router.navigate(['register/Pago']);
    }

    prevPage() {
        this.router.navigate(['register/Personal']);
    }
}
