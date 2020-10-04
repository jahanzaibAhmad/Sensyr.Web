import { Component, Input, OnInit } from '@angular/core';
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
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private gatewayService: GatewayService,
    private toastrService: ToastrService
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

}
