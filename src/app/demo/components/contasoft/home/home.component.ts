import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CompanyService } from '../service/company.service';
import { Router } from '@angular/router';
import { Company } from '../interfaces/company.interface';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [MessageService],
})
export class HomeComponent implements OnInit {
    items!: MenuItem[];
    companyDialog: boolean = false;

    deleteCompanyDialog: boolean = false;

    deleteCompaniesDialog: boolean = false;

    companies: Company[] = [];
    uploadedFiles: any[] = [];
    company: Company = {};

    selectedCompanies: Company[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    userID =''

    rowsPerPageOptions = [5, 10, 20];
    imageUrl: string | ArrayBuffer | null = null;

    constructor(
        private companyService: CompanyService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('company', '');
        }

         this.userID = localStorage.getItem('userID');
        this.getCompanies(this.userID!);

        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'rnc', header: 'RNC' },
        ];
    }

   
    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageUrl = reader.result;
            var image = this.imageUrl as string;
            this.company.photo = image.replace('data:image/png;base64,', '')
          };
        }
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
    onRowSelect(seleccion: any) {
        localStorage.setItem('company', JSON.stringify(seleccion.data));
        this.router.navigateByUrl('/contasoft/dashboard');
    }
    openNew() {
        this.company = {};
        this.submitted = false;
        this.companyDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteCompaniesDialog = true;
    }

    editCompany(company: Company) {
        this.company = { ...company };
        this.companyDialog = true;
    }

    deleteCompany(company: Company) {
        this.deleteCompanyDialog = true;
        this.company = { ...company };
    }

    confirmDeleteSelected() {
        this.deleteCompanyDialog = false;
        this.companies = this.companies.filter(
            (val) => !this.selectedCompanies.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
        this.selectedCompanies = [];
    }

    confirmDelete() {
        this.deleteCompanyDialog = false;
        this.companies = this.companies.filter(
            (val) => val.id !== this.company.id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
        });
        this.company = {};
    }

    hideDialog() {
        this.companyDialog = false;
        this.submitted = false;
    }

    saveCompany() {
        //this.submitted = true;
        this.company.userid= Number.parseInt(this.userID) 

        if (this.company.name?.trim()) {
            
              this.companyService.create(this.company).subscribe(
                (response) =>{
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });

                   this.getCompanies(this.userID)

                },
                (error) => {

                  this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });

                }
              )


            this.companyDialog = false;
            this.company = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.companies.length; i++) {
            if (this.companies[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
