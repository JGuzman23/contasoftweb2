import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { InvoiceIncome } from '../../interfaces/income.interface';
import { InvoiceService } from '../../service/invoice.service';
import { MessageService } from 'primeng/api';
import { VoidInvoice } from '../../interfaces/void.interface';

@Component({
  selector: 'app-income',
  providers: [MessageService],

  templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit {

  incomeDialog: boolean = false;

  deleteBillDialog: boolean = false;
  voidInvoiceBillDialog: boolean=false
  deleteCompaniesDialog: boolean = false;

  incomes: InvoiceIncome[]=[]

  income: InvoiceIncome = {};
  public voidInvoice: VoidInvoice ={
    invoiceId:0,
    comment:'',
    tipo:0,
    CompanyId:0
  };

  
  selectedCompanies: InvoiceIncome[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  
  companyId=0
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
  public TiposAnulacion: any[] = [
    {
      id: 1,
      valor: 'Deterioro de Factura Pre-Impresa',
    },
    {
      id: 2,
      valor: 'Errores de Impresión (Factura Pre-Impresa)',
    },
    {
      id: 3,
      valor: 'Impresión Defectuosa',
    },
    {
      id: 4,
      valor: 'Corrección de la Información',
    },
    {
      id: 5,
      valor: 'Cambio de Productos',
    },
    {
      id: 6,
      valor: 'Devolución de Productos',
    }
    ,
    {
      id: 7,
      valor: 'Omisión de Productos',
    }
    ,
    {
      id: 8,
      valor: 'Errores en Secuencia NCF',
    }
    ,
    {
      id: 9,
      valor: 'Por Cese de Operaciones',
    }
    ,
    {
      id: 10,
      valor: 'Perdida o Hurto de Talonario(S)',
    }
  ];

  public formasVentas:any[]=[]

  bienoservicio:number =1
  public bienOservicio:any[]=[{
    id:1,valor:'Servicio'
  },{id:2,valor:'Bien'}]

  constructor(private invoiceService: InvoiceService,private messageService: MessageService) { }

  ngOnInit() {
   
    var company = localStorage.getItem('company') || '';
    var jsonCompany = JSON.parse(company);
    if (jsonCompany) {
      this.companyId =jsonCompany.id
    }
    
      this.getAllInvoiceByCompany(this.companyId)


      this.cols = [
          { field: 'fechaComprobante', header: 'Fecha de Facturacion' },
          { field: 'rncCedulaPasaporte', header: 'RNC' },
          { field: 'numeroComprobanteFiscal', header: 'NCF' },
          { field: 'montoFacturado', header: 'Monto Facturado' },
          { field: 'itbisFacturado', header: 'ITBIS Facturado' }
      ];

     
  }
  getAllInvoiceByCompany(id:number){

    
    this.invoiceService.GetMyInvoice607(id).subscribe(
      (response)=>{
        this.incomes = response.data
        this.incomes = this.incomes.sort((a, b)=> a.id - b.id )
        
        
      },(error)=>{

      }
    )
    
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

  voidInvoiceBill(income: InvoiceIncome){
    this.voidInvoiceBillDialog= true;
    this.income = { ...income };
  }
 
  confirmVoidInvoiceBill() {
    this.voidInvoice.invoiceId = this.income.id
    this.voidInvoice.CompanyId = this.companyId 
    console.log(this.voidInvoice);
    
   
    this.invoiceService.anular(this.voidInvoice).subscribe(
      (response) => {
        if (response.success) {

          this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          this.getAllInvoiceByCompany(this.companyId);
        }else{
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });

        }
      },
      (error) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: error.message, life: 3000 });

      }
    );
      this.voidInvoiceBillDialog = false;
      
  }

  confirmDelete() {
    this.invoiceService.deleteInvoiceBill(this.income.id).subscribe(
      (response) => {
        if (response.success) {

          this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          this.getAllInvoiceByCompany(this.companyId);
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
      this.voidInvoiceBillDialog=false;
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
                    this.getAllInvoiceByCompany(this.companyId);
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
