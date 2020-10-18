import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SensorService } from '@app/sensor/shared/sensor.service';
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

  constructor(
    private sensorService: SensorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
    console.log(this.sensorForm);
  }


  save() {
    this.router.navigate(['app', 'sensor', 'add', '1']);
    setTimeout(() => {
      document.getElementById('nav-step-2-tab').click();
    }, 10);
  }

  checkTemplate(val){
    this.sensorForm.controls.sensorTemplate.setValue(val);
    this.isTemplate = val;

  }

}
