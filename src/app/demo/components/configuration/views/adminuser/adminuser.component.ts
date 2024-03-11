import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from '../../../contasoft/interfaces/user.interface';
import { UserService } from 'src/app/demo/service/user.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-adminuser',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        CalendarModule,
        InputMaskModule,
    ],
    providers: [MessageService],

    templateUrl: './adminuser.component.html',
})
export class AdminuserComponent {
    showAdminUserconf: boolean = false;
    public users: User[] = [];
    public user: User;
    public userDialog: boolean = false;
    public deleteUserDialog: boolean=false;
    /**
     *
     */
    constructor(
        private userService: UserService,
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        this.userService.getUserByCompany(1, 3).subscribe(
            (response) => {
                this.users = response.data;
                console.log(this.users);
            },
            (error) => {}
        );
    }

    openNew() {
        this.user = {
            id: 0,
            fullName: '',
            email: '',
            cellphone: '',
            password: '',
            username: '',
            planId: 0,
        };
        this.userDialog = true;
    }
    editUser(user: User) {
      this.user = { ...user };
      this.userDialog = true;
   }
   deleteUser(user: User) {
    this.user = { ...user };
    this.deleteUserDialog = true;
 }

    showDialogAdminUserconf() {
        console.log('hola mundo');

        this.showAdminUserconf = true;
    }
}
