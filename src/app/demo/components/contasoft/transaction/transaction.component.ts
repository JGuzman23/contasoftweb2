import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Transaction } from '../interfaces/transaction.interface';
import { Bank } from '../interfaces/bank.interface';
import { TransactionService } from '../service/transaction.service';
import { BankService } from '../service/bank.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transaction',
  providers: [MessageService],
  templateUrl: './transaction.component.html',
})
export class TransactionComponent implements OnInit {
  transactionDialog: boolean = false;

  deleteTransactionDialog: boolean = false;

  deleteTransactionsDialog: boolean = false;

  transactions: Transaction[] = [];

  transaction: Transaction = {};

  selectedTransactions: Transaction[] = [];

  submitted: boolean = false;
  public total = 0;

  fechaHasta: string;
  fechadesde: string;
  cuentaSelected: string;
  bancos: Bank[] = [];
  tipo: any[] = [
      {
          valor: 'Debito',
          id: 'debito',
      },
      { valor: 'Crédito', id: 'credito' },
  ];
  cols: any[] = [];

  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  rangeDates: Date[] | undefined;
  constructor(
      private transactionService: TransactionService,
      private bankService: BankService,
      private messageService: MessageService
  ) {}

  async ngOnInit() {
      var company = localStorage.getItem('company') || '';
      var jsonCompany = JSON.parse(company);

      if (jsonCompany.id) {
        this.getAllTransactionByCompany(jsonCompany.id);
          this.bankService
              .GetMyBanks(jsonCompany.id)
              .subscribe((response) => {
                  this.bancos = response.data;
                  this.bancos.forEach((bank) => {
                      bank.name = bank.name + ' - ' + bank.accountNumber;
                  });
              });
      }

      this.cols = [
          { field: 'bankNumberIn', header: 'Banco entrada' },
          { field: 'bankNumberOut', header: 'Banco salida' },
          { field: 'noCheck', header: 'Transaccion' },
          { field: 'concept', header: 'Concepto' },
          { field: 'transactionDate', header: 'Fecha' },
          { field: 'amount', header: 'Credito' },
          { field: 'amount', header: 'Debito' },
      ];
  }

  getAllTransactionByCompany(companyId: number) {
      this.submitted = true;
          this.transactionService
              .GetAll(companyId)
              .subscribe(
                  (response) => {
                      // Manejar la respuesta de la solicitud HTTP aquí
                      this.transactions = response.data;


                      for (
                          let index = this.transactions.length - 1;
                          index >= 0;
                          index--
                      ) {
                          const t = this.transactions[index];

                          if (t.tipo === 'debito') {
                              this.total -= t.amount;
                          } else {
                              this.total += t.amount;
                          }

                          // Actualizar la propiedad `total` en cada objeto de transacción
                          this.transactions[index].total = this.total;
                      }
                  },
                  (error) => {
                      // Manejar errores aquí
                      console.error('Error al obtener la compañía:', error);
                  }
              );
      
  }

  openNew() {
      this.transaction = {};
      this.submitted = false;
      this.transactionDialog = true;
  }

  // deleteSelectedProducts() {
  //     this.deleteTransactionsDialog = true;
  // }

  // editProduct(transaction: Transaction) {
  //     this.transaction = { ...transaction };
  //     this.transactionDialog = true;
  // }

  // deleteProduct(transaction: Transaction) {
  //     this.deleteTransactionDialog = true;
  //     this.transaction = { ...transaction };
  // }

  // confirmDeleteSelected() {
  //     this.deleteTransactionsDialog = false;
  //     this.transactions = this.transactions.filter(
  //         (val) => !this.selectedTransactions.includes(val)
  //     );
  //     this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Products Deleted',
  //         life: 3000,
  //     });
  //     this.selectedTransactions = [];
  // }

  // confirmDelete() {

  // }

  hideDialog() {
      this.transactionDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      const fechaParseada = new Date(this.transaction.transactionDate);
      const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
      } as const;

      this.transaction.transactionDate = fechaParseada.toLocaleDateString(
          'es-BO',
          options
      );

      var company = localStorage.getItem('company') || '';
      var jsonCompany = JSON.parse(company);
      if (jsonCompany) {
          this.transaction.companyId = jsonCompany.id;

          this.transactionService.create(this.transaction).subscribe(
              (response) => {
                  if (response.success) {
                      this.messageService.add({
                          severity: 'success',
                          summary: 'Successful',
                          detail: response.message,
                          life: 3000,
                      });
                      this.transactionDialog = false;
                      
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
      for (let i = 0; i < this.transactions.length; i++) {
          if (this.transactions[i].id === id) {
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
      console.log(event);
      console.log(table);
      
      
      table.filterGlobal(
          (event.target as HTMLInputElement).value,
          'contains'
      );
      console.log(table);
  }
}
