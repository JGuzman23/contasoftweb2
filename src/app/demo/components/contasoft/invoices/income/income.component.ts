import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { InvoiceIncome } from '../../interfaces/income.interface';
import { InvoiceService } from '../../service/invoice.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-income',
  providers: [MessageService],

  templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit {

  incomeDialog: boolean = false;

  deleteBillDialog: boolean = false;

  deleteCompaniesDialog: boolean = false;

  incomes: InvoiceIncome[]=[]

  income: InvoiceIncome = {};

  selectedCompanies: InvoiceIncome[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  public TiposIngresos: any[] = [
    {
      id: 1,
      valor: 'Ingresos Por Operaciones (No financieros)',
    },
    {
      id: 2,
      valor: 'Ingresos Financieros',
    },
    {
      id: 3,
      valor: 'Ingresos Extraordinarios',
    },
    {
      id: 4,
      valor: 'Ingresos Por Arrendamientos',
    },
    {
      id: 5,
      valor: 'Ingresos Por Venta de Activos Depreciable',
    },
    {
      id: 6,
      valor: 'Otros Ingresos',
    }
  ];

  public formasVentas:any[]=[]

  bienoservicio:number =1
  public bienOservicio:any[]=[{
    id:1,valor:'Servicio'
  },{id:2,valor:'Bien'}]

  constructor(private invoiceService: InvoiceService,private messageService: MessageService) { }

  ngOnInit() {
   

    
      this.getAllInvoiceByCompany()


      this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' },
          { field: 'rating', header: 'Reviews' },
          { field: 'inventoryStatus', header: 'Status' }
      ];

     
  }
  getAllInvoiceByCompany(){

    var company = localStorage.getItem('company') || '';
    var jsonCompany = JSON.parse(company);
    if (jsonCompany) {
      
    this.invoiceService.GetMyInvoice607(jsonCompany.id).subscribe(
      (response)=>{
        this.incomes = response.data
        this.incomes = this.incomes.sort((a, b)=> a.id - b.id )
        
        
      },(error)=>{

      }
    )
    }
  }

  openNew() {
      this.income = {};
      this.submitted = false;
      this.incomeDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteCompaniesDialog = true;
  }

  editBill(income: InvoiceIncome) {
      this.income = { ...income };
      this.incomeDialog = true;
  }

  deleteBill(income: InvoiceIncome) {
      this.deleteBillDialog = true;
      this.income = { ...income };
  }

 

  confirmDelete() {
    this.invoiceService.deleteInvoiceBill(this.income.id).subscribe(
      (response) => {
        if (response.success) {

          this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          this.getAllInvoiceByCompany();
        }else{
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });

        }
      },
      (error) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: error.message, life: 3000 });

      }
    );
      this.deleteBillDialog = false;
      
      this.income = {};
  }

  hideDialog() {
      this.incomeDialog = false;
      this.submitted = false;
  }

  saveProduct() {
    
    this.submitted = true;

    var company = localStorage.getItem('company') || '';
    var jsonCompany = JSON.parse(company);
    if (jsonCompany) {
        this.income.companyID = jsonCompany.id;
        this.invoiceService.createInvoice607(this.income).subscribe(
            (response) => {
                if (response.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: response.message,
                        life: 3000,
                    });
                    this.incomeDialog = false;
                    this.getAllInvoiceByCompany();
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: response.message,
                        life: 3000,
                    });
                }
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

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.incomes.length; i++) {
          if (this.incomes[i].id === id) {
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
