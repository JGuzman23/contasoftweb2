import { Component } from '@angular/core';
import { InvoiceProduct } from '../../interfaces/product.interface';
import { CompanyService } from '../../service/company.service';
import { Company } from '../../interfaces/company.interface';
import { Income } from '../../interfaces/income.interface';
import { Invoice607 } from '../../interfaces/invoice607.interface';
import { MessageService } from 'primeng/api';
import { InvoiceService } from '../../service/invoice.service';

@Component({
    selector: 'app-template-invoice',
    providers: [MessageService],

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
    clonedProducts: { [s: number]: InvoiceProduct } = {};
    Income: Income = {
        id: 0,
        note: '',
        invoiceNumber: '0',
        products: [],
        invoice607: {},
    };
    Invoice607: Invoice607;
    company: Company = {};
    imageUrl: string | ArrayBuffer | null = null;

    constructor(private companyService: CompanyService, private messageService: MessageService, private InvoiceService:InvoiceService) {}
    ngOnInit() {
        var company = localStorage.getItem('company');
        if (company) {
            var jsonCompany = JSON.parse(company);

            if (jsonCompany.name) {
                this.companyService.GetOne(jsonCompany.id).subscribe(
                    (response) => {
                        this.company = response.data;
                        this.imageUrl = 'data:image/png;base64,'.concat(
                            this.company.photo
                        );
                    },
                    (error) => {}
                );
            }
        }
    }

    onRowEditInit(product: InvoiceProduct) {
        this.clonedProducts[product.id] = { ...product };
    }
    getSubTotales() {}

    onRowEditSave(product: InvoiceProduct) {
        this.getSubTotales();
        if (product.price > 0) {
            delete this.clonedProducts[product.id];
        } else {
        }
    }

    onRowEditCancel(product: InvoiceProduct, index: number) {
        this.Income.products[index] = this.clonedProducts[product.id];
        delete this.clonedProducts[product.id];
    }
    onRowdelete(index: number) {
        this.Income.products.splice(index, 1);
    }

    agregar() {
        this.Income.products.push({
            id: this.Income.products.length,
            name: '',
            amount: 0.0,
            price: 0.0,
            iTBIS: 0.0,
            total: 0.0,
        });
    }

    getTotal(product: InvoiceProduct) {
        // Actualizar el total del producto
        this.Income.products[product.id].total = product.amount * product.price;

        // // Calcular subtotal de ingresos sumando los totales de los productos
        this.Income.invoice607.montoFacturado = this.Income.products.reduce(
            (acc, p) => acc + p.total,
            0
        );

        // Calcular ITBIS
        this.Income.invoice607.itbisFacturado =
            this.Income.invoice607.montoFacturado * 0.18;

        // Calcular total de ingresos sumando el subtotal y el ITBIS
    }
    exportPdf() {
        // Obtener una referencia al elemento <input>

        import('jspdf').then((jsPDF) => {
            const doc = new jsPDF.default('p', 'pt', 'a4');

            doc.html(document.getElementById('invoice'), {
                callback: function (doc) {
                    doc.save();
                },
            });
        });
    }

    save() {
        // this.submitted = true;
        
        var company = localStorage.getItem('company') || '';
        var jsonCompany = JSON.parse(company);
        if (jsonCompany) {
            this.Income.companyID = jsonCompany.id;
            this.InvoiceService.createInvoice607(this.Income).subscribe(
                (response) => {
                    if (response.success) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: response.message,
                            life: 3000,
                        });
                        
                    
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
