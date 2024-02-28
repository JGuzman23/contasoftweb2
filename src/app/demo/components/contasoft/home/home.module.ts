import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AppConfigModule } from 'src/app/layout/config/config.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppLayoutModule } from 'src/app/layout/app.layout.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HomeRoutingModule,
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
        FontAwesomeModule,
        // AppLayoutModule
        
    ],exports:[]
})
export class HomeModule { }
