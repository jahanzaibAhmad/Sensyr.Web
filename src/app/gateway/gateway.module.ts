import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';
import { GatewayAddComponent } from './gateway-add/gateway-add.component';
import { SharedModule } from '@app/shared/module/shared.module';


@NgModule({
  declarations: [GatewayFormComponent, GatewayAddComponent],
  imports: [
    CommonModule,
    GatewayRoutingModule,
    SharedModule
  ]
})
export class GatewayModule { }
