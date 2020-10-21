import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorService } from '@app/sensor/shared/sensor.service';
import { ValidationService } from '@app/shared/validators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sensor-type-modal',
  templateUrl: './sensor-type-modal.component.html',
  styleUrls: ['./sensor-type-modal.component.scss']
})
export class SensorTypeModalComponent implements OnInit {

  sensorTypeForm: FormGroup;

  constructor(
    private ngbActiveModal: NgbActiveModal,
    private sensorService: SensorService,
    private toastrService: ToastrService,
    private validationService: ValidationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bindForm();
  }

  private bindForm() {
    this.sensorTypeForm = this.formBuilder.group({
      sensorTypeName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regGeneralField),
      ])],
      unitName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regGeneralField),
      ])],
    });
  }

  save() {
      this.sensorService.addSensorType(this.sensorTypeForm.value).subscribe(
        data => {
          this.toastrService.success('Sensor Type saved successfully!');
          this.close(true);
        },
        error => {
        });
  }

  close(val?) {
    this.ngbActiveModal.close(val);
  }

}
