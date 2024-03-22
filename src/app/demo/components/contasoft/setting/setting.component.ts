import { Component } from '@angular/core';
import { Company } from '../interfaces/company.interface';
import { CompanyService } from '../service/company.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-setting',
    providers: [MessageService],
    templateUrl: './setting.component.html',
})
export class SettingComponent {
    companyDialog: boolean = false;
    archCompanyDialog: boolean = false;
    deleteCompanyDialog: boolean = false;
    company: Company = {};
    userID = '';
 
    imageUrl: string | ArrayBuffer | null = null;

    constructor(
        private companyService: CompanyService,
        private messageService: MessageService,
        private router: Router
    ) {}
    ngOnInit() {
        if (typeof localStorage !== 'undefined') {
        }

        var company = localStorage.getItem('company');

        this.userID = localStorage.getItem('userID');

        if (company) {
            var jsonCompany = JSON.parse(company);

            if (jsonCompany.name) {
                this.companyService.GetOne(jsonCompany.id).subscribe(
                    (response) => {
                        this.company = response.data;
                            this.imageUrl = 'data:image/png;base64,'.concat(
                                this.company.photo
                            );
                        
                       
                        console.log(response.data);
                    },
                    (error) => {}
                );
            }
        }
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageUrl = reader.result;
                var image = this.imageUrl as string;
                const imageType = this.getImageType(image);
                if (imageType) {
                  // La cadena de datos de imagen es válida
                  const imageData = this.getBase64ImageData(image, imageType);
                  this.company.photo = imageData;
                } else {

                  // La cadena de datos de imagen no es válida
                  this.imageUrl = 'data:image/png;base64,'.concat(
                    this.company.photo
                );
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Formato de imagen no aceptada!.',
                    life: 3000,
                });
                }
            };
        }
    }
    getImageType(imageData: string): string | null {
        // Definir los encabezados correspondientes a los tipos de imagen admitidos
        const imageHeaders = [
            'data:image/png;base64,',
            'data:image/jpeg;base64,',
            'data:image/jpg;base64,',
            'data:image/gif;base64,',
            'data:image/tiff;base64,',
            'data:image/ico;base64,',
        ];
        // Verificar si la cadena comienza con alguno de los encabezados
        for (const header of imageHeaders) {
            if (imageData.startsWith(header)) {
                return header;
            }
        }
        return null; // No se encontró un tipo de imagen válido
    }
    getBase64ImageData(imageData: string, imageType: string): string {
        // Remover el encabezado correspondiente al tipo de imagen para obtener solo los datos base64
        return imageData.replace(imageType, '');
    }

    editCompany() {
        this.companyDialog = true;
    }
    hideDialog() {
        this.companyDialog = false;
    }

    updateCompany() {
        //this.submitted = true;

        if (this.company.name?.trim()) {
            this.companyService.Update(this.company).subscribe(
                (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: response.message,
                        life: 3000,
                    });
                    this.companyDialog = false;
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

    deleteCompany() {
        this.deleteCompanyDialog = true;
    }
    archCompany() {
        this.archCompanyDialog = true;
    }

    confirmDelete() {
        this.deleteCompanyDialog = false;
        this.company.isActive = false;
        if (this.company.name?.trim()) {
            this.companyService.Update(this.company).subscribe(
                (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: response.message,
                        life: 3000,
                    });
                    this.companyDialog = false;
                    this.router.navigateByUrl('/');
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
