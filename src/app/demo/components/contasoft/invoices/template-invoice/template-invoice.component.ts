import { Component } from '@angular/core';

@Component({
  selector: 'app-template-invoice',
 
  templateUrl: './template-invoice.component.html',
})
export class TemplateInvoiceComponent {
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
}