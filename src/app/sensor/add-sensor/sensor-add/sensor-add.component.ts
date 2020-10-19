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
    this.stepTwo = +this.activatedRoute.snapshot.params.stepTwo;
    this.stepThree = +this.activatedRoute.snapshot.params.stepThree;
    this.bindForm();
  }


  ngAfterViewInit() {
    if (this.stepThree) {
      document.getElementById('nav-step-3-tab').click();
    } else if (this.stepTwo) {
      document.getElementById('nav-step-2-tab').click();
    }
  }

  private bindForm() {
    this.sensorForm = this.formBuilder.group({
      sensorTemplate: [null],
      sensorTemplateId: [null, Validators.compose([
        Validators.required,
      ])],
      sensorId: [null],
      sensorName:  [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regGeneralField)
      ])],
      sensorDescription:  [null, Validators.compose([
        Validators.pattern(this.validationService.regGeneralField)
      ])],
      machineId: [null],
      sensorTypeId: [null],
      frequencyNumber: [10],
      criticalMin: [null],
      criticalMax: [null],
      warningMin: [null],
      warningMax: [null],
      dataTypeId: [null],
      customEquation: [null],
      gatewayId: [null],
      portNumber: [null],
      sleepStart: [null],
      sleepEnd: [null],
      criticalityTypeId: [null],
      sensorTypeUnitId: [null],
      comingUnitId: [null],
      daysOff: [null],
    });
  }

  save(val) {
    // this.nextStep(val.step);


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
          this.toastrService.success('Saved successfully!');
          this.nextStep(val.step);
        }
      },
      error => {
        this.toastrService.error(error.error);
      });
  }

  nextStep(step){
    if (step === '2') {
      this.router.navigate(['app', 'sensor', 'add', 1]);
      setTimeout(() => {
        document.getElementById('nav-step-2-tab').click();
      }, 10);
    } else {
      this.router.navigate(['app', 'sensor', 'add', 1, 1]);
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
