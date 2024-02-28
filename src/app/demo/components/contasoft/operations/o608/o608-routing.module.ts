import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { O608Component } from './o608.component';

const routes: Routes = [{ path: '', component: O608Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class O608RoutingModule { }
