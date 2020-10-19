import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SensorService } from '@app/sensor/shared/sensor.service';

@Component({
  selector: 'app-sensor-add-two',
  templateUrl: './sensor-add-two.component.html',
  styleUrls: ['./sensor-add-two.component.scss']
})
export class SensorAddTwoComponent implements OnInit {
  @Input() sensorForm: FormGroup;
  @Output() saveClick = new EventEmitter<any>();
  assets: any;
  gateways: any;
  ports: any;
  freqTime: any;

  constructor(
    private sensorService: SensorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssetsCombo();
    this.getGatewayCombo();
    // this.getNotAssignedGatewayPortsCombo(101202);
  }


  // save() {
  //   this.router.navigate(['app', 'sensor', 'add', '1', '1']);
  //   setTimeout(() => {
  //     document.getElementById('nav-step-3-tab').click();
  //   }, 10);

  // }

  getAssetsCombo() {
    this.sensorService.getAssetsCombo().subscribe(
      data => {
        this.assets = data.Data;
        console.log('Assets' + JSON.stringify(data));
      },
      error => {
      });
  }

  getGatewayCombo() {
    this.sensorService.getGatewayCombo().subscribe(
      data => {
        this.gateways = data.Data;
        console.log('Gateways' + JSON.stringify(data));
      },
      error => {
      });
  }

  getNotAssignedGatewayPortsCombo(gatewayId) {
    this.sensorService.getNotAssignedGatewayPortsCombo(gatewayId).subscribe(
      data => {
        this.ports = data.Data;
        console.log('Ports' + JSON.stringify(data));
      },
      error => {
      });
  }

  checkPort(gatewayId){
    this.getNotAssignedGatewayPortsCombo(gatewayId);
  }

  calcFrequency(type) {
    let val;
    if (type === 'add') {
      val = +this.sensorForm.controls.frequencyNumber.value;
      val = val + 1;
    } else {
      let maxVal = 10;
      if (this.freqTime === 'hrs') {
        maxVal = 1;
      }
      val = +this.sensorForm.controls.frequencyNumber.value;
      if (val > maxVal) {
        val = val - 1;
      }

    }
    this.sensorForm.controls.frequencyNumber.setValue(val);
  }

  frequencyTime(val) {
    this.freqTime = val.target.value;
    if ( this.freqTime === 'min') {
      this.sensorForm.controls.frequencyNumber.setValue(10);

    } else if ( this.freqTime === 'hrs') {
      this.sensorForm.controls.frequencyNumber.setValue(1);
    }

  }


  save() {
    const data = { step:  '3' };
    this.saveClick.emit(data);
  }


}
