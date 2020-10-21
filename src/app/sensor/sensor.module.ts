import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorRoutingModule } from './sensor-routing.module';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { SensorAlarmTableComponent } from './sensor-alarm-table/sensor-alarm-table.component';
import { SensorMachineTotalComponent } from './sensor-machine-total/sensor-machine-total.component';
import { SensorTableComponent } from './sensor-table/sensor-table.component';
import { SensorIndividualTableComponent } from './sensor-individual-table/sensor-individual-table.component';
import { SensorGroupTableComponent } from './sensor-group-table/sensor-group-table.component';
import { SharedModule } from '@app/shared/module/shared.module';
import { SensorGroupFormComponent } from './sensor-group-form/sensor-group-form.component';
import { SensorDetailFormComponent } from './sensor-detail-form/sensor-detail-form.component';
import { SensorDetailAnalyticsComponent } from './sensor-detail-analytics/sensor-detail-analytics.component';
import { DataTablesModule } from 'angular-datatables';
import { SensorAlarmDetailComponent } from './sensor-alarm-detail/sensor-alarm-detail.component';
import { SensorDetailAnalyticsTableComponent } from './sensor-detail-analytics-table/sensor-detail-analytics-table.component';
import { OrderModule } from 'ngx-order-pipe';
import { DateAgoPipe } from '@app/shared/pipes';
import { SensorAddComponent } from './add-sensor/sensor-add/sensor-add.component';
import { SensorAddOneComponent } from './add-sensor/sensor-add-one/sensor-add-one.component';
import { SensorAddTwoComponent } from './add-sensor/sensor-add-two/sensor-add-two.component';
import { SensorAddThreeComponent } from './add-sensor/sensor-add-three/sensor-add-three.component';
import { SensorTypeModalComponent } from './add-sensor/sensor-type-modal/sensor-type-modal.component';

@NgModule({
  declarations: [
    SensorFormComponent,
    SensorAlarmTableComponent,
    SensorMachineTotalComponent,
    SensorTableComponent,
    SensorIndividualTableComponent,
    SensorGroupTableComponent,
    SensorGroupFormComponent,
    SensorDetailFormComponent,
    SensorDetailAnalyticsComponent,
    SensorAlarmDetailComponent,
    SensorDetailAnalyticsTableComponent,
    DateAgoPipe,
    SensorAddComponent,
    SensorAddOneComponent,
    SensorAddTwoComponent,
    SensorAddThreeComponent,
    SensorTypeModalComponent
  ],
  imports: [
    CommonModule,
    SensorRoutingModule,
    SharedModule,
    DataTablesModule,
    OrderModule
  ],
  entryComponents: [
    SensorGroupFormComponent,
  ]
})
export class SensorModule { }
