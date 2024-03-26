import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ChartService } from '../contasoft/service/chart.service';
import { Chart } from '../contasoft/interfaces/chart.interface';
import { response } from 'express';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;
    billCount:any;
    invoiceCount:any;
    chartOptions: any;
    skeleton = true

    subscription!: Subscription;

    constructor( public layoutService: LayoutService, private chartService: ChartService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        
        var company = localStorage.getItem('company') || '';
        var jsonCompany = JSON.parse(company);
        
        if (jsonCompany.id) {
        this.chartService.GetAll(jsonCompany.id).subscribe((response)=>{
            
            this.billCount = response.data.reduce((acumulador, elemento) => {
                acumulador.push( elemento.montoTotalGastos.toString());
                return acumulador;
            }, []);


            this.invoiceCount =response.data.reduce((acumulador, elemento) => {
                acumulador.push( elemento.montoTotalIngresos.toString());
                return acumulador;
            }, []);
            this.skeleton=false
             this.initChart();
        })
    }

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
       const proximos6Meses = this.obtenerUltimos6Meses()
        this.chartData = {
            labels: proximos6Meses,
            datasets: [
                {
                    label: 'Ingresos',
                    data: this.invoiceCount,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--blue-700'),
                    borderColor: documentStyle.getPropertyValue('--blue-700'),
                    tension: .4
                },
                {
                    label: 'Gastos',
                    data: this.billCount,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    obtenerUltimos6Meses(): string[] {
        const meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth(); // Obtiene el mes actual (0 = enero, 1 = febrero, etc.)
        const inicio = mesActual - 5 < 0 ? mesActual + 7 : mesActual + 1; // Ajusta el inicio si estamos en los primeros 6 meses del año
    
        const resultado: string[] = [];
    
        for (let i = 0; i < 6; i++) {
            const indiceMes = (inicio + i) % 12;
            resultado.push(meses[indiceMes]);
        }
    
        return resultado;
    }
    
   
    
    
    
    
}
