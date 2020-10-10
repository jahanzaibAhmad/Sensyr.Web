import { Component, Input, OnInit } from '@angular/core';
import { ConstantService } from '@app/shared/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GatewayAttachSensorListModel } from '../shared/gateway.model';
import { GatewayService } from '../shared/gateway.service';

@Component({
  selector: 'app-gateway-sensor-list',
  templateUrl: './gateway-sensor-list.component.html',
  styleUrls: ['./gateway-sensor-list.component.scss']
})
export class GatewaySensorListComponent implements OnInit {

  @Input() data;
  gatewayAttachSensorListModel: GatewayAttachSensorListModel[] = [];
  selectedSensorId: any;
  newgatewayAttachSensorListModel: GatewayAttachSensorListModel[] = [];
  term: any;
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private gatewayService: GatewayService,
    private toastrService: ToastrService,
    private constantService: ConstantService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getAttachSensorsForPortGatewaySearch();
  }


  close() {
    this.ngbActiveModal.close();
  }


  getAttachSensorsForPortGatewaySearch() {
    this.gatewayService.getAttachSensorsForPortGatewaySearch().subscribe(
      data => {
        this.gatewayAttachSensorListModel = data.Data;
        this.newgatewayAttachSensorListModel =  this.constantService.detachObject(data.Data);
      },
      error => {
      });
  }

  attachSensorToGatewayPort() {
    let obj;
    obj = {};
    obj.sensorID = this.selectedSensorId;
    obj.gatewayPortID = this.data.GatewayPortID;
    this.gatewayService.attachSensorToGatewayPort(obj).subscribe(
      data => {
        this.toastrService.success('Sensor attached Successfully!');
        this.close();
      },
      error => {
      });
  }

  selectedSensor(sensorId){
    this.selectedSensorId = sensorId;
  }

  filter() {
    const values = this.newgatewayAttachSensorListModel;
    if (this.term != null && this.term !== '') {
      let filter = this.term;
      const keyArray = ['SensorId', 'SensorName'];
      if (!values || !values.length) { return []; }
      if (!filter) { return values; }

      filter = filter.toUpperCase();

      if (filter && Array.isArray(values)) {
        const keys = keyArray;
        this.gatewayAttachSensorListModel = values.filter(v => v && keys.some(k => String(v[k]).toUpperCase().indexOf(filter) >= 0));
      }
    } else {
      this.gatewayAttachSensorListModel = values;
    }
  }

  clearFilter(){
    this.term = '';
    this.gatewayAttachSensorListModel = this.newgatewayAttachSensorListModel;
  }

}
