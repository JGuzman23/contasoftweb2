import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConciliacionComponent } from './conciliacion.component';

const routes: Routes = [{ path: '', component: ConciliacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConciliacionRoutingModule { }
