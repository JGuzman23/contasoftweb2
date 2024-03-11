import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PickListModule } from 'primeng/picklist';
import { User } from '../../../contasoft/interfaces/user.interface';
import { UserService } from 'src/app/demo/service/user.service';
import { CompanyService } from '../../../contasoft/service/company.service';
import { Company } from '../../../contasoft/interfaces/company.interface';
@Component({
    selector: 'app-user-company',
    standalone: true,
    imports: [
        PickListModule,
        DialogModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        InputMaskModule,
        FormsModule,
        CommonModule,
    ],
    templateUrl: './user-company.component.html',
})
export class UserCompanyComponent {
    public showUserCompanyconf: boolean = false;
    public users: User[] = [];
    public companies: Company[] = [];
    public companiesSelected: Company[] = [];

    constructor(private userService: UserService, private companyService: CompanyService) {}

    async ngOnInit() {
        this.userService.getUserByCompany(1, 3).subscribe(
            (response) => {
                this.users = response.data;
                console.log(this.users);
            },
            (error) => {}
        );

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('company', '');
        }

        var userID = localStorage.getItem('userID');
        this.getCompanies(userID!);
    }

    showDialogUserCompanyconf() {
        console.log('hola mundo');

        this.showUserCompanyconf = true;
    }
    getCompanies(userId: string) {
        this.companyService.Get(userId).subscribe(
            (response) => {
                this.companies = response.data;
            },
            (error) => {
                // Manejar errores aquí
                console.error('Error al obtener la compañía:', error);
            }
        );
    }
    save(){
      console.log(this.companiesSelected);
      
    }
}
