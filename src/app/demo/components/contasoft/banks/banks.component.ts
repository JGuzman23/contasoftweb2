import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BankService } from 'src/app/demo/components/contasoft/service/bank.service';
import { Bank } from '../interfaces/bank.interface';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Currency } from '../interfaces/currency.interface';

@Component({
    selector: 'app-banks',
    providers: [MessageService],

    templateUrl: './banks.component.html',
})
export class BanksComponent implements OnInit {
    bankDialog: boolean = false;

    deleteBankDialog: boolean = false;

    deleteBanksDialog: boolean = false;

    currency:Currency[]=[]
    banks: Bank[] = [];
    bancos: Bank[] = [];

    bank: Bank = {
        id: 0,
        accountNumber: '',
        name: '',
        bankSelectedID: 0,
        companyId: 0,
        accountName: '',
        accountTypeID: 0,
        initialBalance: 0,
        currencyID: 0,
    };
    accountType:any[]=[
        {
            id:1, valor:'Banco Nacional'
        },
        {
            id:2, valor:'Tarjeta Credito'
        },
        {
            id:3, valor:'Efectivo'
        }
    ]

    selectedBanks: Bank[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    rangeDates: Date[] | undefined;
    constructor(
        private bankService: BankService,
        private messageService: MessageService,
        private router: Router
    ) {}

    async ngOnInit() {
        this.getAllBanks();
        
        var company = localStorage.getItem('company') || '';
        var jsonCompany = JSON.parse(company);

        if (jsonCompany.id) {
            await this.getAllBankByCompany(jsonCompany.id);
        } else {
            this.router.navigateByUrl('/home');
        }

        this.bankService.getCurrency().subscribe(
            (response)=>{

                if(response.success){
                    this.currency= response.data
                }
            },(error)=>{

            }
        )

        this.cols = [
            { field: 'name', header: 'Banco' },
            { field: 'accountNumber', header: 'Cuenta' },
           
            { field: 'initialBalance', header: 'Saldo Actual' },
            { field: 'currencyID', header: 'Moneda' },
        ];
    }

    getAllBanks() {
        this.bankService.GetAllBanks().subscribe((response) => {
            this.bancos = response.data;
        });
    }
    getCurrencyFlags(id:number){
        
        
       return this.currency.find(x=>x.id==id)
    }

    async getAllBankByCompany(companyId: number) {
        (await this.bankService.Get(companyId)).subscribe(
            (response) => {
                this.banks = response.data;
            },
            (error) => {
                console.error('Error al obtener la compañía:', error);
            }
        );
    }

    openNew() {
        this.bank = {
            id: 0,
            accountNumber: '',
            name: '',
            bankSelectedID: 0,
            companyId: 0,
            accountName: '',
            accountTypeID:0,
            initialBalance:0,
            currencyID:0
        };
        this.submitted = false;
        this.bankDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteBanksDialog = true;
    }

    editProduct(bank: Bank) {
        this.bank = { ...bank };
        this.bankDialog = true;
    }

    deleteProduct(bank: Bank) {
        this.deleteBankDialog = true;
        this.bank = { ...bank };
    }

    confirmDeleteSelected() {
        this.deleteBanksDialog = false;
        this.banks = this.banks.filter(
            (val) => !this.selectedBanks.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
        this.selectedBanks = [];
    }

    confirmDelete() {
        this.bankService.deleteMyBank(this.bank.bankSelectedID).subscribe(
            (response) => {
                if (response.success) {
                    this.deleteBankDialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: response.message,
                        life: 3000,
                    });
                    var company = localStorage.getItem('company') || '';
                    var jsonCompany = JSON.parse(company);

                    if (jsonCompany.id) {
                        this.getAllBankByCompany(jsonCompany.id);
                    }
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: response.message,
                        life: 3000,
                    });
                }
            },
            (error) => {}
        );
    }

    hideDialog() {
        this.bankDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        var company = localStorage.getItem('company') || '';
        var jsonCompany = JSON.parse(company);
        if (jsonCompany) {
            this.bank.companyId = jsonCompany.id;
            
            if(this.bank.bankSelectedID==0){
                this.bankService.asingnar(this.bank).subscribe(
                    (response) => {
                        if (response.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: response.message,
                                life: 3000,
                            });
                            this.bankDialog = false;
                            this.getAllBankByCompany(jsonCompany.id);
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
            }else{
                this.bankService.updateMyBank(this.bank).subscribe(
                    (response) => {
                        if (response.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: response.message,
                                life: 3000,
                            });
                            this.bankDialog = false;
                            this.getAllBankByCompany(jsonCompany.id);
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
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.banks.length; i++) {
            if (this.banks[i].id === id) {
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
