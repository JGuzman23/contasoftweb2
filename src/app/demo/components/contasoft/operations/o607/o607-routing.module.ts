import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { O607Component } from './o607.component';

const routes: Routes = [{ path: '', component: O607Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class O607RoutingModule { }
