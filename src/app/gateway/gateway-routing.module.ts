import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';


const routes: Routes = [
  {
    path: '',
    component: GatewayFormComponent,
    data: {
      breadcrumb: null
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatewayRoutingModule { }
