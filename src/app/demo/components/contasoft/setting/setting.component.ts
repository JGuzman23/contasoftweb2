import { Component } from '@angular/core';
import { Company } from '../interfaces/company.interface';
import { CompanyService } from '../service/company.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-setting',
    providers: [MessageService],
    templateUrl: './setting.component.html',
})
export class SettingComponent {
    companyDialog: boolean = false;
    archCompanyDialog:boolean=false
    deleteCompanyDialog: boolean = false;
    company: Company = {};
    userID = '';
    imageUrl: string | ArrayBuffer | null = null;

    constructor(
        private companyService: CompanyService,
        private messageService: MessageService,
        private router:Router
    ) {}
    ngOnInit() {
        if (typeof localStorage !== 'undefined') {
        }

        var company = localStorage.getItem('company');

        this.userID = localStorage.getItem('userID');

        if (company) {
            var jsonCompany = JSON.parse(company);

            if (jsonCompany.name) {
                this.companyService.GetOne(jsonCompany.id).subscribe(
                    (response) => {
                        this.company = response.data;
                        this.imageUrl = 'data:image/jpg;base64,'.concat(
                            this.company.photo
                        );
                        console.log(response.data);
                    },
                    (error) => {}
                );
            }
        }
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageUrl = reader.result;
                var image = this.imageUrl as string;
                this.company.photo = image.replace(
                    'data:image/png;base64,',
                    ''
                );
            };
        }
    }

    editCompany() {
        this.companyDialog = true;
    }
    hideDialog() {
        this.companyDialog = false;
    }

    updateCompany() {
        //this.submitted = true;

        if (this.company.name?.trim()) {
            this.companyService.Update(this.company).subscribe(
                (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: response.message,
                        life: 3000,
                    });
                    this.companyDialog = false;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message,
                        life: 3000,
                    });
                }
            );
        }
    }

    deleteCompany() {
        this.deleteCompanyDialog = true;
    }
    archCompany() {
        this.archCompanyDialog = true;
    }

    confirmDelete() {
        this.deleteCompanyDialog = false;
        this.company.isActive=false;
        if (this.company.name?.trim()) {
            this.companyService.Update(this.company).subscribe(
                (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: response.message,
                        life: 3000,
                    });
                    this.companyDialog = false;
                  this.router.navigateByUrl('/');
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message,
                        life: 3000,
                    });
                }
            );
        }
    }
}
