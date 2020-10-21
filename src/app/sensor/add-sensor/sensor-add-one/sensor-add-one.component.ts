import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorService } from '@app/sensor/shared/sensor.service';
import { SensorDataTypeIDEnum, SensorDataTypeNameEnum } from '@app/shared/services';
import { ValidationService } from '@app/shared/validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SensorTypeModalComponent } from '../sensor-type-modal/sensor-type-modal.component';

@Component({
  selector: 'app-sensor-add-one',
  templateUrl: './sensor-add-one.component.html',
  styleUrls: ['./sensor-add-one.component.scss']
})
export class SensorAddOneComponent implements OnInit {
  @Input() sensorForm: FormGroup;

  @Output() saveClick = new EventEmitter<any>();

  isTemplate: boolean;
  sensorTemplates: any;
  units: any;
  sensorTypes: any;
  sensorDataTypeNameEnum: typeof SensorDataTypeNameEnum;
  sensorDataTypeIDEnum: typeof SensorDataTypeIDEnum;
  dataType =  null;
  sensorId: any;

  constructor(
    private sensorService: SensorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private validationService: ValidationService,
    private ngbModal: NgbModal,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.sensorId = params.sensorId;
    });

    this.sensorDataTypeNameEnum = SensorDataTypeNameEnum;
    this.sensorDataTypeIDEnum = SensorDataTypeIDEnum;
    this.getNewSensorId();
    this.getSensorTemplatesCombo();
    this.getSensorTypesCombo();
  }



  checkTemplate(val) {
    this.sensorForm.controls.sensorTemplate.setValue(val);
    this.units = [];
    this.sensorForm.controls.sensorTemplateId.setValue(null);
    if (val) {
      this.sensorForm.controls.sensorTypeId.disable();
      this.sensorForm.controls.customEquation.disable();
    } else {
      this.sensorForm.controls.sensorTypeId.enable();
      this.sensorForm.controls.customEquation.enable();
    }
    this.emptySensorTemplateValue();
    this.isTemplate = val;
  }

  checkDataType(name, id) {
    this.dataType = name;
    if (id) {
      this.sensorForm.controls.dataTypeId.setValue(+id);
    }
    this.sensorForm.controls.customEquation.setValue(null);
  }


  getNewSensorId() {
    this.sensorService.getNewSensorId().subscribe(
      data => {
        this.sensorForm.controls.sensorId.setValue(data);
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
    this.sensorForm.controls.sensorTypeId.setValue(null);
    this.sensorForm.controls.sensorTypeUnitId.setValue(null);
    this.sensorForm.controls.comingUnitId.setValue(null);
    if (sensorTemplateId) {
      const sensorTemplate = this.sensorTemplates.find(x => x.SensorTemplateId === sensorTemplateId);
      this.sensorForm.controls.customEquation.setValue(sensorTemplate.CustomEquation);
      this.sensorForm.controls.dataTypeId.setValue(+sensorTemplate.DataType);
      if (sensorTemplate.SensorTypeId) {
        this.sensorForm.controls.sensorTypeId.setValue(+sensorTemplate.SensorTypeId);
      }
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
    if (sensorTypeId && isNaN(sensorTypeId)) {
      this.sensorForm.controls.sensorTypeId.setValue(null);
      this.addSensorType();
    }
    else if (sensorTypeId) {
      this.getSensorTypeUnitsCombo(sensorTypeId);
    } else {
      this.sensorForm.controls.customEquation.setValue(null);
    }
    this.units = [];
    this.sensorForm.controls.sensorTypeUnitId.setValue(null);
    this.sensorForm.controls.comingUnitId.setValue(null);
  }

  addSensorType(){
    const modalRef = this.ngbModal.open(SensorTypeModalComponent, {
      size: 'lg',
      windowClass: 'gateway-modal',
      backdrop: true,
      keyboard: false,
    });
    modalRef.result.then((result) => {
      if (result) {
        this.getSensorTypesCombo();
      }
    }).catch((error) => {
      console.log(error);
    });
  }


  emptySensorTemplateValue() {
    this.units = [];
    this.sensorForm.controls.customEquation.setValue(null);
    this.dataType =  null;
  }

  save() {
    const data = { step: '1', sensorId: this.sensorForm.controls.sensorId };
    this.saveClick.emit(data);
  }

  isNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // save() {
  //   this.router.navigate(['app', 'sensor', 'add', '1']);
  //   setTimeout(() => {
  //     document.getElementById('nav-step-2-tab').click();
  //   }, 10);
  // }

}
