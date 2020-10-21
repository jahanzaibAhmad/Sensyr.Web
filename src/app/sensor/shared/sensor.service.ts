import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '@app/shared/services/base.service';
import { ApiService, SensorStatusIdEnum } from '@app/shared/services';
import { SensorEndPoints, DashboardEndPoints } from '@app/shared/endpoints/sensor';
import { ToastrService } from 'ngx-toastr';
import { GatewayEndPoints } from '@app/shared/endpoints/gateway';
import { AssetEndPoints } from '@app/shared/endpoints/asset';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SensorService extends BaseService<any> {

  // sensorForm: FormGroup;

  alarmTableSelectEvent = new EventEmitter<any>();
  alarmCountEvent = new EventEmitter<any>();
  private urlTest = 'assets/json/test.json';
  public SelectedUser$: BehaviorSubject<any> = new BehaviorSubject({} as any);
  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private sensorEndPoints: SensorEndPoints,
    private dashboardEndPoints: DashboardEndPoints,
    private gatewayEndPoints: GatewayEndPoints,
    private assetEndPoints: AssetEndPoints,
    private http: HttpClient,
    private httpBackend: HttpBackend,
    private constantService: HttpBackend,
    private toastrService: ToastrService
  ) {
    super(
      httpClient,
      environment.api_uri);
  }

  getAlaramDetails(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getAlarmsEndPoint)
      .pipe(map((data: any) => data));
  }

  getTotalAlarmsStatuses(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getTotalAlarmsStatusesEndPoint)
      .pipe(map((data: any) => data));
  }

  getAlarmsStatuses(): Observable<any> {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getAlarmsStatusesEndPoint)
      .pipe(map((data: any) => data));
  }

  getSensorsByGroupId(id) {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorsByGroupIdEndPoint + '?Id=' + id)
      .pipe(map((data: any) => data));
  }

  getSensorGroupSensorsPerformance(id) {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorGroupSensorsPerformanceEndPoint + '?GroupId=' + id + '&PerPage=10000&Page=1')
      .pipe(map((data: any) => data));
  }
  getSensorById(id) {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorByIdEndPoint + '?Id=' + id)
      .pipe(map((data: any) => data));
  }

  getSensorDetailAnalyticsPerformance(id) {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorDetailAnalyticsPerformanceEndPoint + '?Id=' + id)
      .pipe(map((data: any) => data));
  }

  getSensorDetailLastTransactions(id) {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorDetailLastTransactionsEndPoint + '?id=' + id)
      .pipe(map((data: any) => data));
  }


  getSensorDetailAnalyticsStatus(id) {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorDetailAnalyticsStatusEndPoint + '?Id=' + id)
      .pipe(map((data: any) => data));
  }


  getTotalMachinesGroupsSensors(): Observable<any> {
    this.get(this.apiService.dashboardApi + this.dashboardEndPoints.getTotalMachinesGroupsSensorsEndPoint)
      .subscribe(data => {
        this.SelectedUser$.next(data);
      });
    return this.SelectedUser$;
    // .pipe(map((data: any) => data));
  }

  getIndividualSensors(config: any, search?: any): Observable<any> {
    let endPoint = this.sensorEndPoints.getIndividualSensorsEndPoint + '?Page=' + config.currentPage + '&PerPage' + config.itemsPerPage;
    if (search) {
      endPoint = endPoint + '&Search=' + search;
    }
    return this.get(this.apiService.sensorApi + endPoint)
      .pipe(map((data: any) => data));
  }

  getSensorGroups(search?): Observable<any> {
    let endPoint = this.sensorEndPoints.getSensorGroupsEndPoint;
    if (search) {
      endPoint = this.sensorEndPoints.getSensorGroupsEndPoint + '?Search=' + search;
    }
    return this.get(this.apiService.sensorApi + endPoint)
      .pipe(map((data: any) => data));
  }


  getTestDetail(): Observable<any> {
    this.http = new HttpClient(this.httpBackend);
    return this.http.get(this.urlTest);
  }


  getNewSensorId() {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getNewSensorIdEndPoint, '',  'text');
  }

  getSensorTemplatesCombo() {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorTemplatesComboEndPoint)
      .pipe(map((data: any) => data));
  }

  getSensorTypesCombo() {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorTypesComboEndPoint)
      .pipe(map((data: any) => data));
  }

  getSensorTypeUnitsCombo(sensorTypeId) {
    return this.get(this.apiService.sensorApi + this.sensorEndPoints.getSensorTypeUnitsComboEndPoint + '?sensorTypeId=' + sensorTypeId)
      .pipe(map((data: any) => data));
  }

  // Assets
  getAssetsCombo() {
    return this.get(this.apiService.assetApi + this.assetEndPoints.getAssetsComboEndPoint)
      .pipe(map((data: any) => data));
  }

  getAssetsGroupsCombo() {
    return this.get(this.apiService.assetApi + this.assetEndPoints.getAssetsGroupsComboEndPoint)
      .pipe(map((data: any) => data));
  }

  // Assets

  // Gateway
  getGatewayCombo() {
    return this.get(this.apiService.gatewayApi + this.gatewayEndPoints.getGatewayComboEndPoint)
      .pipe(map((data: any) => data));
  }

  getNotAssignedGatewayPortsCombo(gatewayId) {
    return this.get(this.apiService.gatewayApi + this.gatewayEndPoints.getNotAssignedGatewayPortsComboEndPoint + '?GatewayId=' + gatewayId)
      .pipe(map((data: any) => data));
  }

  // Gateway

  deleteSensor(id) {
    return this.delete(0, this.apiService.sensorApi + this.sensorEndPoints.deleteSensorsEndPoint + '?Ids=' + id)
      .pipe(map((data: any) => data));
  }

  deleteSensors(idsArray) {
    return this.delete(0, this.apiService.sensorApi + this.sensorEndPoints.deleteSensorsEndPoint + idsArray)
      .pipe(map((data: any) => data));
  }

  addSensor(body): Observable<any> {
    return this.post(body, this.apiService.sensorApi + this.sensorEndPoints.addSensorEndPoint)
      .pipe(map((data: any) => data));
  }

  addSensorType(body): Observable<any> {
    return this.post(body, this.apiService.sensorApi + this.sensorEndPoints.addSensorTypeEndPoint)
      .pipe(map((data: any) => data));
  }



  updateSensor(sensor, data) {
    sensor.SensorId = data.sensorId;
    sensor.Voltage = data.voltage;
    sensor.LiveValue = data.liveValue;
    sensor.SensorStatusId = data.sensorStatusId;
    sensor.SensorStatusName = data.sensorStatusName;
    sensor.DateTime = data.dateTime;
    sensor.Avg = data.avg;
    sensor.DayMin = data.dayMin;
    sensor.DayMax = data.dayMax;
    sensor.TimeElapsed = data.timeElapsed;
    sensor.SensorName = data.sensorName;
    sensor.SensorTypeName = data.sensorTypeName;
    sensor.MachineName = data.machineName;
    this.manageSensorCount();
  }


  addRemoveSensor(sensor, data, model) {
    if (data.sensorStatusId === SensorStatusIdEnum.stable) {
      if (model) {
        const index = model.findIndex(x => x.SensorId === data.sensorId);
        if (index > -1) {
          model.splice(index, 1);
          if (data.shouldNotifyMessage) {
            this.toastrMessage(data);
          }
          this.manageSensorCount();
        }
      }
    } else if (!sensor) {
      sensor = {};
      sensor.SensorId = data.sensorId;
      sensor.Voltage = data.voltage;
      sensor.LiveValue = data.liveValue;
      sensor.SensorStatusId = data.sensorStatusId;
      sensor.SensorStatusName = data.sensorStatusName;
      sensor.DateTime = data.dateTime;
      sensor.Avg = data.avg;
      sensor.DayMin = data.dayMin;
      sensor.DayMax = data.dayMax;
      sensor.TimeElapsed = data.timeElapsed;
      sensor.SensorName = data.sensorName;
      sensor.SensorTypeName = data.sensorTypeName;
      sensor.MachineName = data.machineName;
      if (model) {
        model.push(sensor);
        if (data.shouldNotifyMessage) {
          this.toastrMessage(data);
        }
        this.manageSensorCount();
      }
    }
  }

  toastrMessage(data) {
    const message = data.notifyMessage;
    const sensorStatusId = data.sensorStatusId;
    if (sensorStatusId === SensorStatusIdEnum.critical) {
      this.toastrService.error(message);
    } else if (sensorStatusId === SensorStatusIdEnum.warning) {
      this.toastrService.warning(message);
    } else if (sensorStatusId === SensorStatusIdEnum.inProgress) {
      this.toastrService.info(message);
    } else if (sensorStatusId === SensorStatusIdEnum.stable) {
      this.toastrService.success(message);
    }
  }

  manageSensorCount() {
    this.alarmCountEvent.emit(true);
  }
}
