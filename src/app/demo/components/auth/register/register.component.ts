import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { UserService } from 'src/app/demo/service/user.service';
import { Router } from '@angular/router';
import { User } from '../../contasoft/interfaces/user.interface';
import { UserRegisterService } from './userRegister.service';
import { PaypalReturn } from './Interfaces/paypal.interface';

@Component({
    selector: 'app-register',
    providers: [MessageService],
    styleUrl: './register.style.css',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    // loading = false;
    items: MenuItem[] | undefined;
    public user: User = {
        id: 0,
        fullName: '',
        email: '',
        cellphone: '',
        password: '',
        username: '',
        planId: 0,
        roleId: 1,
    };
    activeIndex: number = 0;
    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private router: Router,
        private UserRegister: UserRegisterService
    ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Personal',
                routerLink: 'Personal',
            },
            {
                label: 'Plan',
                routerLink: 'Plan',
            },
            {
                label: 'Pago',
                routerLink: 'Pago',
            },
            {
                label: 'Confirmacion',
                disabled: true,
            },
        ];

        this.UserRegister.sendUserEvent.subscribe(user => {
            this.UserARegistrar(user);
        });

        this.UserRegister.sendPlanEvent.subscribe(plan =>{
            this.PlanARegistar(plan)
        });
        this.UserRegister.sendPayEvent.subscribe(pay=>{
            this.payARegistar(pay)
        })
    }

    UserARegistrar(model: User) {
        console.log('El modelo: ', model);
    }
    PlanARegistar(model: number){
        console.log('El plan: ', model);
    }

    payARegistar(model: PaypalReturn){
        console.log('El pago: ', model);
    }
    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    registrar() {
        this.userService.createUser(this.user).subscribe(
            (res) => {
                console.log('la para');

                if (res.success) {
                    console.log('entro');

                    this.messageService.add({
                        severity: 'success',
                        summary: 'En hora buena!',
                        detail: res.message,
                        life: 3000,
                    });
                    this.router.navigateByUrl('/auth/login');
                } else {
                    console.log('entro');

                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: res.message,
                        life: 3000,
                    });
                }
            },
            (error) => {
                console.log(error.mensaje);
            }
        );
    }
}
