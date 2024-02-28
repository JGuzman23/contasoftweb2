import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        
    ]
})
export class AuthModule { }
