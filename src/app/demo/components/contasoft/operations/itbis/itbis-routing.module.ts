import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItbisComponent } from './itbis.component';

const routes: Routes = [{ path: '', component: ItbisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItbisRoutingModule { }
