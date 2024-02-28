import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InvoiceBill } from '../../interfaces/bill.interface';
import { InvoiceService } from '../../service/invoice.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-bill',
  providers: [MessageService],
  templateUrl: './bill.component.html',
})
export class BillComponent implements OnInit {

  billDialog: boolean = false;

  deleteBillDialog: boolean = false;

  deleteCompaniesDialog: boolean = false;

  bills: InvoiceBill[]=[]

  bill: InvoiceBill = {};

  selectedCompanies: InvoiceBill[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  public ListTipoBienesyServicios: any[] = [
    {
      id: 1,
      valor: 'Gastos de personal',
    },
    {
      id: 2,
      valor: 'Gastos por trabajo, suministro o servicios',
    },
    {
      id: 3,
      valor: 'Arrendamientos',
    },
    {
      id: 4,
      valor: 'Gastos activo fijo',
    },
    {
      id: 5,
      valor: 'Gastos de representacion',
    },
    {
      id: 6,
      valor: 'Otras deducciones administrativas',
    },
    {
      id: 7,
      valor: 'Gastos financieros',
    },
    {
      id: 8,
      valor: 'Gastos extraordinarios',
    },
    {
      id: 9,
      valor: 'Compras y gastos que forman parte del costo de venta',
    },
    {
      id: 10,
      valor: 'Aquisiciones de activos',
    },
    {
      id: 11,
      valor: 'Gastos de seguros',
    },
  ];

  public payType: any[] = [
    {
      id: 1,
      valor: 'Efectivo',
    },
    {
      id: 2,
      valor: 'Cheque/Tranferencia/Deposito',
    },
    {
      id: 3,
      valor: 'Tarjeta credito/debito',
    },
    {
      id: 4,
      valor: 'Compra a credito',
    },
    {
      id: 5,
      valor: 'Permuta',
    },
    {
      id: 6,
      valor: 'Nota Credito',
    },
    {
      id: 7,
      valor: 'Mixto',
    },
  ];

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
      
    this.invoiceService.GetMyInvoice606(jsonCompany.id).subscribe(
      (response)=>{
        this.bills = response.data
        this.bills = this.bills.sort((a, b)=> a.id - b.id )
        
        
      },(error)=>{

      }
    )
    }
  }

  openNew() {
      this.bill = {};
      this.submitted = false;
      this.billDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteCompaniesDialog = true;
  }

  editBill(bill: InvoiceBill) {
      this.bill = { ...bill };
      this.billDialog = true;
  }

  deleteBill(bill: InvoiceBill) {
      this.deleteBillDialog = true;
      this.bill = { ...bill };
  }

 

  confirmDelete() {
    this.invoiceService.deleteInvoiceBill(this.bill.id).subscribe(
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
      
      this.bill = {};
  }

  hideDialog() {
      this.billDialog = false;
      this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    var company = localStorage.getItem('company') || '';
    var jsonCompany = JSON.parse(company);
    if (jsonCompany) {
        this.bill.companyID = jsonCompany.id;
        this.invoiceService.createInvoice606(this.bill).subscribe(
            (response) => {
                if (response.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: response.message,
                        life: 3000,
                    });
                    this.billDialog = false;
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
      for (let i = 0; i < this.bills.length; i++) {
          if (this.bills[i].id === id) {
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