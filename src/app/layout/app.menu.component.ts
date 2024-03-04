import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'fas fa-home', routerLink: ['/contasoft/dashboard'] }
                ]
            },
            {
                label: 'Contabilidad',
                items: [
                    { label: 'Bancos', icon: ' fa-building-columns', routerLink: ['/contasoft/mod/banks'] },
                    { label: 'Clientes', icon: 'fas fa-users', routerLink: ['/contasoft/mod/clients'] },
                    { label: 'Transacciones', icon: 'fas fa-money-bill-transfer', routerLink: ['/contasoft/mod/transaction'] },
                    {
                        label: 'Operaciones',
                        icon: 'fas fa-briefcase',
                        items: [
                            {
                                label: '606',
                                icon: ' fa-file-lines',
                                routerLink: ['/contasoft/mod/o606']
                            },
                            {
                                label: '607',
                                icon: 'fa-file-lines',
                                routerLink: ['/contasoft/mod/o607']
                            },
                            {
                                label: '608',
                                icon: 'fa-file-lines',
                                routerLink: ['/contasoft/mod/o608']
                            },
                            {
                                label: 'ITBIS',
                                icon: 'fa-file-lines',
                                routerLink: ['/contasoft/mod/itbis']
                            },
                            {
                                label: 'Conciliacion',
                                icon: ' fa-money-check-dollar',
                                routerLink: ['/contasoft/mod/conciliacion']
                            },
                        ]
                    },
                    {
                        label: 'Factura',
                        icon: 'fa-file-invoice',
                        items: [
                            {
                                label: 'Ingresos',
                                icon: 'fa-wallet',
                                routerLink: ['/contasoft/mod/income']
                            },
                            {
                                label: 'Gastos',
                                icon: 'fa-file-invoice',
                                routerLink: ['/contasoft/mod/bill']
                            },
                        ]
                    },
                ]
            },
        ];
    }
}
