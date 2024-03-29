import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { AppConfigModule } from './config/config.module';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { HomeComponent } from '../demo/components/contasoft/home/home.component';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfigurationComponent } from '../demo/components/configuration/configuration.component';
import { AvatarModule } from 'primeng/avatar';
import { UserRolesComponent } from '../demo/components/configuration/views/user-roles/user-roles.component';
import { UserComponent } from '../demo/components/configuration/views/user/user.component';
import { ChangepasswordComponent } from '../demo/components/configuration/views/changepassword/changepassword.component';
import { AdminuserComponent } from '../demo/components/configuration/views/adminuser/adminuser.component';
import { UserCompanyComponent } from '../demo/components/configuration/views/user-company/user-company.component';
import { ImageModule } from 'primeng/image';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        HomeComponent,
        ConfigurationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,TieredMenuModule,
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        AppConfigModule,
        MenuModule,
        PanelMenuModule,
        FieldsetModule,
        AvatarModule,
        CheckboxModule,
        InputMaskModule,
        UserRolesComponent,
        UserComponent,
        ChangepasswordComponent,
        AdminuserComponent,
        UserCompanyComponent,
        ImageModule

       
    ],
    exports: [AppLayoutComponent,AppTopBarComponent]
})
export class AppLayoutModule { }
