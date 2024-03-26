import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../interfaces/transaction.interface';
import { Table } from 'primeng/table';
import { TransactionService } from '../../service/transaction.service';
import { MessageService } from 'primeng/api';
import { Bank } from '../../interfaces/bank.interface';
import { BankService } from '../../service/bank.service';
interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-conciliacion',
    providers: [MessageService],

    templateUrl: './conciliacion.component.html',
})
export class ConciliacionComponent implements OnInit {
    transactionDialog: boolean = false;

    deleteTransactionDialog: boolean = false;

    deleteTransactionsDialog: boolean = false;

    transactions: Transaction[] = [];

    transaction: Transaction = {};

    selectedTransactions: Transaction[] = [];

    submitted: boolean = false;
    public total = 0;
    exportColumns!: ExportColumn[];

    fechaHasta: Date = new Date();
    fechadesde: Date = new Date();
    fechadesden =''
    fechaHastan=''
    isReady=false
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
        this.fechadesde.setDate(this.fechadesde.getDate() - 30);
        var company = localStorage.getItem('company') || '';
        var jsonCompany = JSON.parse(company);
        
        if (jsonCompany.id) {
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
            { field: 'credit', header: 'Credito' },
            { field: 'debit', header: 'Debito' },
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

    }
    buscar() {
        

        var company = localStorage.getItem('company') || '';
        var jsonCompany = JSON.parse(company);

        if (jsonCompany.id) {
            this.isReady=true
            this.getAllTransactionByCompany(jsonCompany.id);
        }
    }
    exportPdf() {
        import('jspdf').then((jsPDF) => {
            
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('p', 'px', 'a4');

                doc.setFontSize(18);
                doc.setTextColor(46,128,186); 
                doc.text("Conciliación bancaria", 160, 40,);
                doc.setFontSize(11);
                doc.setTextColor(0);
                doc.text(`Cuenta: ${this.cuentaSelected}` , 30, 60,);
                doc.text(`Fecha: ${this.fechadesden} - ${this.fechaHastan}` , 30, 70,);
                (doc as any).autoTable(this.exportColumns, this.transactions, {
                    startY: 90 // Ajusta este valor según sea necesario
                  });
                doc.save(`${this.cuentaSelected} | ${this.fechadesden} - ${this.fechaHastan}.pdf`);
            });
        });

        this.hideDialog();
    }
    getAllTransactionByCompany(companyId: number) {
        this.submitted = true;

        if (
            this.cuentaSelected?.trim() ||
            this.fechaHasta== undefined ||
            this.fechadesde == undefined
        ) {
            const fechaParseadaDesde = new Date(this.fechadesde);
            const options1 = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            } as const;

             this.fechadesden = fechaParseadaDesde.toLocaleDateString(
                'es-BO',
                options1
            );

            const fechaParseadaHasta = new Date(this.fechaHasta);
            const options2 = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            } as const;

             this.fechaHastan = fechaParseadaHasta.toLocaleDateString(
                'es-BO',
                options2
            );
       
            

            this.transactionService
                .Get(companyId, this.fechadesden, this.fechaHastan, this.cuentaSelected)
                .subscribe(
                    (response) => {
                        // Manejar la respuesta de la solicitud HTTP aquí
                        this.transactions = response.data;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: response.message,
                            life: 3000,
                        });

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
  
        
        
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
      
    }
}
