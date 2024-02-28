import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    public companyName = '';
  public userID:string
  username:string
    ngOnInit() {
       this.userID = localStorage.getItem('userID')
      
         var company = localStorage.getItem('company');
         if(company){
          var jsonCompany = JSON.parse(company);
    
          if (jsonCompany.name) {
           this.companyName = jsonCompany.name;
         }
         }
        
        this.items = [
          {
            label:  this.getUser(this.userID),
            icon: 'pi pi-search',
            command: () => {
            }
          },
          {
            label: 'Configuración',
            icon: 'pi pi-file',
            
          },
         
          {
            separator: true
          },
          {
            label: 'Cerrar sesion',
            icon: 'pi pi-sign-out',
            command: () => {
                this.logout();
             }
          }
        ];
      }

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private router: Router, private userService:UserService) { }


    getUser(userid:string){
      this.userService.Get(userid).subscribe(
        (response)=>{
          this.username = response.fullName
          
          
        },(error)=>{

        }
      )

      return this.username
    }
    logout(){

        localStorage.removeItem('token');
        localStorage.removeItem('company');
        localStorage.removeItem('userID');
        this.router.navigateByUrl('/auth/login');
    }
}