import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
   
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
     providers: [MessageService]

})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    loading=false
    user = {
        email: '',
        password: '',
      }

    constructor(private messageService: MessageService,private authService: AuthService, private router: Router) { }


    login(){
      this.loading=true
        this.authService
        .login(this.user.email, this.user.password)
        .subscribe((res) => {
          if (res.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userID', res.data.id);
           
            this.router.navigateByUrl('/');
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });

            this.loading=false
           
          }
        })
        
    }
}
