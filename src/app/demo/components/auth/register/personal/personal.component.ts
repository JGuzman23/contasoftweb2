import { Component } from '@angular/core';
import { User } from '../../../contasoft/interfaces/user.interface';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/demo/service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    selector: 'app-personal',
    standalone: true,
    imports: [ CommonModule,ButtonModule,InputTextModule,FormsModule,PasswordModule,ToastModule,InputMaskModule],
    templateUrl: './personal.component.html',
})
export class PersonalComponent {
    public user: User = {
        id: 0,
        fullName: '',
        email: '',
        cellphone: '',
        password: '',
        username: '',
        planId: 0,
        roleId: 0,
    };

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private router: Router
    ) {}
}
