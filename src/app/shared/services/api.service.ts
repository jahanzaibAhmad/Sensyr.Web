import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly sensorApi: string = 'Sensor/';
  readonly assetApi: string = 'Asset/';
  readonly gatewayApi: string = 'Gateway/';
  readonly variantApi: string = 'Variant/';
  readonly dashboardApi: string = 'Dashboard/';
  readonly authApi: string = 'Auth/';

  constructor() { }


}
