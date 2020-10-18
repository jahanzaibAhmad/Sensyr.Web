import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SensorService } from '@app/sensor/shared/sensor.service';
import { SensorDataTypeIDEnum, SensorDataTypeNameEnum } from '@app/shared/services';
import { ValidationService } from '@app/shared/validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sensor-add-one',
  templateUrl: './sensor-add-one.component.html',
  styleUrls: ['./sensor-add-one.component.scss']
})
export class SensorAddOneComponent implements OnInit {
  @Input() sensorForm: FormGroup;
  isTemplate: boolean;
  sensorTemplates: any;
  units: any;
  sensorTypes: any;
  sensorDataTypeNameEnum: typeof SensorDataTypeNameEnum;
  dataType =  null;

  constructor(
    private sensorService: SensorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
    this.sensorDataTypeNameEnum = SensorDataTypeNameEnum;
    this.getNewSensorId();
    this.getSensorTemplatesCombo();
    this.getSensorTypesCombo();
  }


  save() {
    this.router.navigate(['app', 'sensor', 'add', '1']);
    setTimeout(() => {
      document.getElementById('nav-step-2-tab').click();
    }, 10);
  }

  checkTemplate(val) {
    this.sensorForm.controls.sensorTemplate.setValue(val);
    this.units = [];
    this.sensorForm.controls.SensorTemplateId.setValue(null);
    if (val) {
      this.sensorForm.controls.SensorTypeId.disable();
    } else {
      this.sensorForm.controls.SensorTypeId.enable();
    }
    this.emptySensorTemplateValue();
    this.isTemplate = val;
  }

  checkDataType(val){
    this.dataType = val;
  }


  getNewSensorId() {
    this.sensorService.getNewSensorId().subscribe(
      data => {
        this.sensorForm.controls.SensorId.setValue(data);
      },
      error => {
      });
  }

  getSensorTemplatesCombo() {
    this.sensorService.getSensorTemplatesCombo().subscribe(
      data => {
        this.sensorTemplates = data.Data;
        console.log('Template' + JSON.stringify(data));
      },
      error => {
      });
  }

  getSensorTypesCombo() {
    this.sensorService.getSensorTypesCombo().subscribe(
      data => {
        this.sensorTypes = data.Data;
        console.log('Sensor Types' + JSON.stringify(data));
      },
      error => {
      });
  }

  getSensorTypeUnitsCombo(sersorTypeId) {
    this.sensorService.getSensorTypeUnitsCombo(sersorTypeId).subscribe(
      data => {
        this.units = data.Data;
        console.log('Units' + JSON.stringify(data));
      },
      error => {
      });
  }

  checkSensorTemplate(sensorTemplateId) {
    if (sensorTemplateId) {
      const sensorTemplate = this.sensorTemplates.find(x => x.SensorTemplateId === sensorTemplateId);
      this.sensorForm.controls.CustomEquation.setValue(sensorTemplate.CustomEquation);
      if (sensorTemplate.DataType === SensorDataTypeIDEnum.analog) {
        this.dataType = SensorDataTypeNameEnum.analog;
      } else if (sensorTemplate.DataType === SensorDataTypeIDEnum.digital) {
        this.dataType = SensorDataTypeNameEnum.digital;
      }
      this.getSensorTypeUnitsCombo(sensorTemplate.SensorTypeId);
    } else {
      this.emptySensorTemplateValue();
    }
  }

  checkSensorType(sensorTypeId) {
    if (sensorTypeId) {
      this.getSensorTypeUnitsCombo(sensorTypeId);
    } else {
      this.sensorForm.controls.CustomEquation.setValue(null);
    }
  }


  emptySensorTemplateValue() {
    this.units = [];
    this.sensorForm.controls.CustomEquation.setValue(null);
    this.dataType =  null;
  }

}
