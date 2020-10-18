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
    });
  }

}
