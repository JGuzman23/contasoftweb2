import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    public companyName = '';
    public userName = 'Juan Guzman';

    username: string;
    ngOnInit() {
       
        let token = localStorage.getItem('token');
        
       let  decodedToken = jwtDecode(token);
       console.log( decodedToken);
       ;
        var company = localStorage.getItem('company');
        if (company) {
            var jsonCompany = JSON.parse(company);

            if (jsonCompany.name) {
                this.companyName = jsonCompany.name;
            }
        }

        this.items = [
            {
                label: 'Configuración',
                icon: 'pi pi-cog',
                routerLink: ['/configuration'],
            },

            {
                separator: true,
            },
            {
                label: 'Cerrar sesion',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.logout();
                },
            },
        ];

        this.sucursales=[
          {
            label:'La feria',
            icon:''
          }
        ]
    }

    items!: MenuItem[];
    sucursales!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private userService: UserService
    ) {}

    goToDashboard(){
        this.router.navigateByUrl('/contasoft/dashboard')
    }
    getUser(userid: string) {
        this.userService.Get(userid).subscribe(
            (response) => {
                this.username = response.fullName;
            },
            (error) => {}
        );

        return this.username;
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('company');
        localStorage.removeItem('userID');
        this.router.navigateByUrl('/auth/login');
    }
}
