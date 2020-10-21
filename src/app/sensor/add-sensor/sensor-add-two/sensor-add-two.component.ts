import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorService } from '@app/sensor/shared/sensor.service';

@Component({
  selector: 'app-sensor-add-two',
  templateUrl: './sensor-add-two.component.html',
  styleUrls: ['./sensor-add-two.component.scss']
})
export class SensorAddTwoComponent implements OnInit, OnChanges {
  @Input() sensorForm: FormGroup;
  @Output() saveClick = new EventEmitter<any>();
  assets: any;
  gateways: any;
  ports: any;
  freqTime: any;
  sensorId: any;

  constructor(
    private sensorService: SensorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.sensorId = params.sensorId;
    });

    this.getAssetsCombo();
    this.getGatewayCombo();
    // this.getNotAssignedGatewayPortsCombo(101202);
    this.setValidators();
  }
  setValidators() {
    this.sensorForm.controls.machineId.setValidators([Validators.required]);
    this.sensorForm.controls.gatewayId.setValidators([Validators.required]);
  }

  ngOnChanges() {
    // create header using child_id
    console.log(this.sensorForm);
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

  back(){
    document.getElementById('nav-step-1-tab').click();
    // this.router.navigate(['app', 'sensor', 'add'], {queryParams: { sensorId: this.sensorId } });
  }


}
