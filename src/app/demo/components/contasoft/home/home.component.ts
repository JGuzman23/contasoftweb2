import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  providers: [MessageService]
})

export class HomeComponent implements OnInit {

  
  companyDialog: boolean = false;

  deleteCompanyDialog: boolean = false;

  deleteCompaniesDialog: boolean = false;

  companies: Company[]=[]
  uploadedFiles: any[] = [];
  company: Company = {};

  selectedCompanies: Company[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private companyService: CompanyService,private router:Router, private messageService: MessageService) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('company', "")
        }

      var userID =localStorage.getItem('userID') 
      this.getCompanies(userID!)


      this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' },
          { field: 'rating', header: 'Reviews' },
          { field: 'inventoryStatus', header: 'Status' }
      ];

     
  }

  handleFileInput(event:any) {
    console.log(event);
    
   
}
  onUpload(event:UploadEvent) {
    console.log(event);
    
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);
    

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
 getCompanies(userId:string){
     this.companyService.Get(userId)
    .subscribe(
      (response) => {
    
        this.companies = response.data
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener la compañía:', error);
      }
    );
  }
  onRowSelect(seleccion :any){
    localStorage.setItem('company', JSON.stringify(seleccion.data))
    this.router.navigateByUrl('/contasoft/dashboard')
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
      this.companies = this.companies.filter(val => !this.selectedCompanies.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedCompanies = [];
  }

  confirmDelete() {
      this.deleteCompanyDialog = false;
      this.companies = this.companies.filter(val => val.id !== this.company.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.company = {};
  }

  hideDialog() {
      this.companyDialog = false;
      this.submitted = false;
  }

  saveCompany() {
      //this.submitted = true;

      console.log(this.company);
      

      // if (this.company.name?.trim()) {
      //     if (this.company.id) {
      //         // @ts-ignore
             
      //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      //     } else {
             
      //       this.companyService.create(this.company).subscribe(
      //         (response) =>{
      //           // this.getCompanies(1)
               
      //           this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
      //         },
      //         (error) => {
                
      //           this.messageService.add({ severity: 'success', summary: 'Successful', detail: error.message, life: 3000 });

      //         }
      //       )
             
      //     }

      //     this.companyDialog = false;
      //     this.company = {};
      // }
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
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}