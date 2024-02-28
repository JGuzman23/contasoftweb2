import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { O606Component } from './o606.component';

const routes: Routes = [{ path: '', component: O606Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class O606RoutingModule { }
