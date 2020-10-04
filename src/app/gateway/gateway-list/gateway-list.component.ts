import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GatewayListModel } from '@app/gateway/shared/gateway.model';
import { ConstantService } from '@app/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GatewaySensorListComponent } from '../gateway-sensor-list/gateway-sensor-list.component';
import { GatewayService } from '../shared/gateway.service';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit {
  gatewayListModel: GatewayListModel[] = [];
  @Input() private searchClick: EventEmitter<any>;
  searchText: string;
  sensorModel: any = [];

  constructor(
    private gatewayService: GatewayService,
    private toastrService: ToastrService,
    private constantService: ConstantService,
    private ngbModal: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getGateways();
    this.searchEvent();
  }


  searchEvent() {
    this.searchClick.subscribe(
      data => {
        this.getGateways(data);
      }
    );
  }

  getGateways(searchText?) {
    this.gatewayService.getGateways(searchText).subscribe(
      data => {
        this.gatewayListModel = data.Data;
        // console.log(data.Data[1]);
      },
      error => {
      });
  }

  getGatewayPortSensorDetails(portID) {
    this.gatewayService.getGatewayPortSensorDetails(portID).subscribe(
      data => {
        this.sensorModel['portID' + portID] = data.Data;
        console.log(data);
      },
      error => {
      });
  }

  disconnectGatewayPort(gatewayPort, gatewayPorts) {
    this.gatewayService.disconnectGatewayPort(gatewayPort.GatewayPortID).subscribe(
      data => {
        const index = gatewayPorts.findIndex(x => x.GatewayPortID === gatewayPort.GatewayPortID);
        if (index > -1) {
          gatewayPorts[index].GatewayPortSensorId = null;
        }
        gatewayPort.show = false;
        this.toastrService.success('Sensor Disconnected Successfully!');
      },
      error => {
      });
  }

  openPanel(gatewayPort, gatewayPorts) {
    const portID = gatewayPort.GatewayPortID;
    if (gatewayPort.GatewayPortSensorId) {
      const portShow = this.constantService.detachObject(!gatewayPort.show);
      if (portShow && !(this.sensorModel['sensorId' + portID])) {
        this.getGatewayPortSensorDetails(portID);
      }
      this.magagePorts(gatewayPort, gatewayPorts);

    } else {
      this.openGatewayAdd(gatewayPort);
    }
  }

  magagePorts(gatewayPort: any, gatewayPorts: any) {
    const portShow = this.constantService.detachObject(!gatewayPort.show);
    gatewayPorts.forEach(element => {
      if (element.show) {
        element.show = false;
      }
    });
    gatewayPort.show = portShow;
  }

  openGatewayAdd(gatewayPort) {
    const modalRef = this.ngbModal.open(GatewaySensorListComponent, {
      size: 'lg',
      windowClass: 'gateway-modal',
      backdrop: true,
      keyboard: false,
    });
    modalRef.componentInstance.data = gatewayPort;
    modalRef.result.then((result) => {
      this.getGateways();
    }).catch((error) => {
      console.log(error);
    });
  }

}
