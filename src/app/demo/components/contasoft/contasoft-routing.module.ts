import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'banks', loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule) },
        { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
        { path: 'o606', loadChildren: () => import('./operations/o606/o606.module').then(m => m.O606Module) },
        { path: 'o607', loadChildren: () => import('./operations/o607/o607.module').then(m => m.O607Module) },
        { path: 'o608', loadChildren: () => import('./operations/o608/o608.module').then(m => m.O608Module) },
        { path: 'bill', loadChildren: () => import('./invoices/bill/bill.module').then(m => m.BillModule) },
        { path: 'income', loadChildren: () => import('./invoices/income/income.module').then(m => m.IncomeModule) },
        { path: 'conciliacion', loadChildren: () => import('./operations/conciliacion/conciliacion.module').then(m => m.ConciliacionModule) },
        { path: 'itbis', loadChildren: () => import('./operations/itbis/itbis.module').then(m => m.ItbisModule) },
        { path: 'transaction', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule) },
        { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule) },
        { path: 'factura', loadChildren: () => import('./invoices/template-invoice/template-invoice.module').then(m => m.TemplateInvoiceModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ContasoftRoutingModule { }
