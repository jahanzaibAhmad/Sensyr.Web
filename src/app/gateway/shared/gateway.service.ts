import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GatewayEndPoints } from '@app/shared/endpoints/gateway';
import { VariantEndPoints } from '@app/shared/endpoints/variant';
import { ApiService } from '@app/shared/services';
import { BaseService } from '@app/shared/services/base.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GatewayService extends BaseService<any> {

  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private gatewayEndPoints: GatewayEndPoints,
    private variantEndPoints: VariantEndPoints
  ) {
    super(
      httpClient,
      environment.api_uri);
  }

  addGateway(body): Observable<any> {
    return this.post(body, this.apiService.gatewayApi + this.gatewayEndPoints.addGatewayEndPoint)
      .pipe(map((data: any) => data));
  }

  attachSensorToGatewayPort(body): Observable<any> {
    return this.post(body, this.apiService.gatewayApi + this.gatewayEndPoints.attachSensorToGatewayPortEndPoint)
      .pipe(map((data: any) => data));
  }

  getGateways(): Observable<any> {
    return this.get(this.apiService.gatewayApi + this.gatewayEndPoints.getGatewaysEndPoint)
      .pipe(map((data: any) => data));
  }

  disconnectGatewayPort(): Observable<any> {
    return this.get(this.apiService.gatewayApi + this.gatewayEndPoints.disconnectGatewayPortEndPoint)
      .pipe(map((data: any) => data));
  }


  // Variants
  getVariants(): Observable<any> {
    return this.post('', this.apiService.variantApi + this.variantEndPoints.getVariantsEndPoint)
      .pipe(map((data: any) => data));
  }

}
