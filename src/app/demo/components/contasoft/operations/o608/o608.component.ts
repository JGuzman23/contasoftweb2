import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { O608 } from '../../interfaces/o608.interface';
import { InvoiceService } from '../../service/invoice.service';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-o608',
    providers: [MessageService],
    templateUrl: './o608.component.html',
})
export class O608Component implements OnInit {
    bankDialog: boolean = false;

    o608s: O608[] = [];
    o608: O608 = {};

    public jsonCompany: any;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    rangeDates: Date[] | undefined;
    constructor(
        private invoiceService: InvoiceService,
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        this.getAll608();
        this.cols = [
            { field: 'anome', header: 'Año / Mes' },
            { field: 'amount', header: 'Cantidad de Facturas' },
            { field: 'monto', header: 'Monto Facturado' },
            { field: 'itbis', header: 'ITBIS Facturado' },
            { field: 'fecha', header: 'Fecha de creacion' },
        ];
    }

    getAll608() {
        var company = localStorage.getItem('company') || '';
        this.jsonCompany = JSON.parse(company);
        if (this.jsonCompany) {
            this.invoiceService.GetMy608s(this.jsonCompany.id).subscribe(
                (response) => {
                    this.o608s = response.data;
                },
                (error) => {}
            );
        }
    }

    openNew() {
        this.o608 = {};
        this.submitted = false;
        this.bankDialog = true;
    }

    descargarxlsx608(id: number, formato: number) {
        this.invoiceService.descargar608(id, formato).subscribe(
            (response) => {

                const blob = this.b64toBlob(
                    response.data.fileContents,
                    response.data.contentType
                );

                // Crear un URL para el Blob
                const blobUrl = URL.createObjectURL(blob);

                // Crear un enlace y descargar el archivo
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = response.data.fileDownloadName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

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
                    summary: 'Erro',
                    detail: response.message,
                    life: 3000,
                });
                }
            },
            (error) => {
            }
        );
    }

    b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }
    descargartxt608(id: number, formato: number, anomes: string) {
        this.invoiceService.descargar608(id, formato).subscribe(
            (response) => {
                const contenido = response.data;

                // Crear un Blob (Binary Large Object) con el contenido del archivo y el tipo MIME
                const blob = new Blob([contenido], {
                    type: 'text/plain;charset=utf-8',
                });
                

                // Utilizar FileSaver para guardar el Blob como un archivo
                FileSaver.saveAs(
                    blob,
                    `608-${this.jsonCompany.name}${anomes}.txt`
                );

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
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.o608s.length; i++) {
            if (this.o608s[i].id === id) {
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
