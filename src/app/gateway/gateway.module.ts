import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';
import { GatewayAddComponent } from './gateway-add/gateway-add.component';
import { SharedModule } from '@app/shared/module/shared.module';
import { GatewayListComponent } from './gateway-list/gateway-list.component';


@NgModule({
  declarations: [GatewayFormComponent, GatewayAddComponent, GatewayListComponent],
  imports: [
    CommonModule,
    GatewayRoutingModule,
    SharedModule
  ]
})
export class GatewayModule { }
