import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorService } from '@app/sensor/shared/sensor.service';
import { ValidationService } from '@app/shared/validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sensor-add',
  templateUrl: './sensor-add.component.html',
  styleUrls: ['./sensor-add.component.scss']
})
export class SensorAddComponent implements OnInit, AfterViewInit {

  sensorForm: FormGroup;
  enableStepTwo: boolean;
  enableStepThree: boolean;
  sensorId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorService: SensorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private validationService: ValidationService
  ) { }

  stepTwo: any;
  stepThree: any;


  ngOnInit(): void {
    // this.stepTwo = +this.activatedRoute.snapshot.params.stepTwo;
    // this.stepThree = +this.activatedRoute.snapshot.params.stepThree;
    // this.sensorId = this.activatedRoute.snapshot.params.sensorId;

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.step === '3') {
        this.stepTwo = true;
        this.stepThree = true;
      } else if (params.step === '2') {
        this.stepTwo = true;
      }
      this.sensorId = params.sensorId;
    });

    if (this.sensorId) {
      this.getSensorById(this.sensorId);
    }

    this.bindForm();
  }

  getSensorById(sensorId) {
    this.sensorService.getSensorById(sensorId).subscribe(
      data => {
        this.setValues(data.Data);
      },
      error => {
      });
  }

  private setValues(data) {
    let values;
    values = {};
    Object.keys(data).forEach(key => {
      values[key.toLowerCase()] = data[key];
    });
    Object.keys(this.sensorForm.controls).forEach(key => {
      if (values[key.toLowerCase()] !== undefined) {
        this.sensorForm.get(key).patchValue(values[key.toLowerCase()]);
      }
    });
  }

  ngAfterViewInit() {
    if (this.stepThree) {
      document.getElementById('nav-step-3-tab').click();
      this.enableStepThree = true;
    } else if (this.stepTwo) {
      this.enableStepTwo = true;
      document.getElementById('nav-step-2-tab').click();
    }
  }

  private bindForm() {
    this.sensorForm = this.formBuilder.group({
      sensorTemplate: [null],
      sensorTemplateId: [null],
      sensorId: [null, Validators.compose([
        Validators.required,
      ])],
      sensorName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regGeneralField)
      ])],
      sensorDescription: [null, Validators.compose([
        Validators.pattern(this.validationService.regGeneralField)
      ])],
      machineId: [null],
      sensorTypeId: [null, Validators.compose([
        Validators.required,
      ])],
      frequencyNumber: [10],
      criticalMin: [null],
      criticalMax: [null],
      warningMin: [null],
      warningMax: [null],
      dataTypeId: [null],
      customEquation: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regEquationField)
      ])],
      gatewayId: [null],
      portNumber: [null],
      sleepStart: [null],
      sleepEnd: [null],
      criticalityTypeId: [null],
      sensorTypeUnitId: [null, Validators.compose([
        Validators.required,
      ])],
      comingUnitId: [null, Validators.compose([
        Validators.required,
      ])],
      daysOff: [null],
    });
  }

  save(val) {

    const body = this.getValues(this.sensorForm.controls);
    this.sensorService.addSensor(body).subscribe(
      data => {
        if (data.errors) {
          let errors = '';
          data.errors.$values.forEach(element => {
            errors += element.ErrorMessage + ' </br>';
          });
          this.toastrService.error(errors, '', { enableHtml: true });
        } else {
          this.sensorId = this.sensorForm.controls.sensorId.value;
          this.toastrService.success('Saved successfully!');
          this.nextStep(val.step);
        }
      },
      error => {
        this.toastrService.error(error.error);
      });
  }

  nextStep(step) {
    if (step === '1') {
      this.enableStepTwo = true;
      this.router.navigate(['app', 'sensor', 'add'], { queryParams: { sensorId: this.sensorId, step: '2' } });
      this.stepTwo = true;
      setTimeout(() => {
        document.getElementById('nav-step-2-tab').click();
      }, 10);
    } else {
      this.router.navigate(['app', 'sensor', 'add'], { queryParams: { sensorId: this.sensorId, step: '3' } });
      this.stepThree = true;
      setTimeout(() => {
        document.getElementById('nav-step-3-tab').click();
      }, 10);
    }
  }

  getValues(controls) {
    let value;
    value = {};
    for (const key in controls) {
      value[key] = this.sensorForm.controls[key].value;
    }
    return value;
  }

}
