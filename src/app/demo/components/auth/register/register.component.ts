import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from '../../contasoft/interfaces/user.interface';
import { UserService } from 'src/app/demo/service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    providers: [MessageService],

    templateUrl: './register.component.html',
})
export class RegisterComponent {
    public user: User = {
        id: 0,
        fullName: '',
        email: '',
        cellphone: '',
        password: '',
        username: '',
        planId: 0,
        roleId:0
    };
    loading = false;
    items: MenuItem[] | undefined;

    activeIndex: number = 0;
    constructor(private messageService: MessageService, private userService: UserService, private router: Router) {}
    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    registrar() {

       
        
        this.loading = true;
        this.user.planId=1;
        this.user.roleId=1;
        this.userService
            .createUser(this.user)
            .subscribe((res) => {
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

                    this.loading = false;
                }
            },(error)=>{
                console.log(error.mensaje);
                
            });
    }

}
