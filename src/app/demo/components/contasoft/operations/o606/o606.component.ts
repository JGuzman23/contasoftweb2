import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { O606 } from '../../interfaces/o606.interface';
import { InvoiceService } from '../../service/invoice.service';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-o606',
    providers: [MessageService],
    templateUrl: './o606.component.html',
})
export class O606Component implements OnInit {
    o606Dialog: boolean = false;

    o606s: O606[] = [];
    o606: O606 = {};

    public jsonCompany: any;

    submitted: boolean = false;

    cols: any[] = [];
    periodRange: any[] = [
        '2024/01',
        '2024/02',
        '2024/03',
        '2024/04',
        '2024/05',
    ];
    peridod = '';

    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    rangeDates: Date[] | undefined;
    constructor(
        private invoiceService: InvoiceService,
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        this.getAll606();
        this.cols = [
            { field: 'yearMonth', header: 'Año / Mes' },
            { field: 'amount', header: 'Cantidad de Facturas' },
            { field: 'monto', header: 'Monto Facturado' },
            { field: 'itbis', header: 'ITBIS Facturado' },
            { field: 'fecha', header: 'Fecha de creacion' },
        ];
    }

    getAll606() {
        var company = localStorage.getItem('company') || '';
        this.jsonCompany = JSON.parse(company);
        if (this.jsonCompany) {
            this.invoiceService.GetMy606s(this.jsonCompany.id).subscribe(
                (response) => {
                    this.o606s = response.data;
                },
                (error) => {}
            );
        }
    }

    openNew() {
        this.o606 = {};
        this.submitted = false;
        this.o606Dialog = true;
    }
    genarar606() {
        this.invoiceService.Generar606(this.peridod).subscribe(
            (response) => {
                if (response.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: response.message,
                        life: 3000,
                    });
                    this.o606Dialog = false;
                    this.getAll606();
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

    descargarxlsx606(id: number, formato: number) {
        this.invoiceService.descargar606(id, formato).subscribe(
            (response) => {
                const blob = this.b64toBlob(
                    response.data.fileContents,
                    response.data.contentType
                );
                const blobUrl = URL.createObjectURL(blob);

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
            (error) => {}
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
    descargartxt606(id: number, formato: number, anomes: string) {
        this.invoiceService.descargar606(id, formato).subscribe(
            (response) => {
                const contenido = response.data;

                // Crear un Blob (Binary Large Object) con el contenido del archivo y el tipo MIME
                const blob = new Blob([contenido], {
                    type: 'text/plain;charset=utf-8',
                });

                // Utilizar FileSaver para guardar el Blob como un archivo
                FileSaver.saveAs(
                    blob,
                    `606-${this.jsonCompany.name}${anomes}.txt`
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
        this.o606Dialog = false;
        this.submitted = false;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.o606s.length; i++) {
            if (this.o606s[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
