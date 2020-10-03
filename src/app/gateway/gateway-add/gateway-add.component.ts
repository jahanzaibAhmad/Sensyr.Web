import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayService } from '@app/gateway/shared/gateway.service';
import { ToastrService } from 'ngx-toastr';
import { VariantModel } from '@app/gateway/shared/gateway.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@app/shared/validators';

@Component({
  selector: 'app-gateway-add',
  templateUrl: './gateway-add.component.html',
  styleUrls: ['./gateway-add.component.scss']
})
export class GatewayAddComponent implements OnInit {
  gatewayForm: FormGroup;

  variantModel: VariantModel[] = [];
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private gatewayService: GatewayService,
    private toastrService: ToastrService,
    private validationService: ValidationService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this. getTotalAlarmsStatuses();
    this.bindForm();
  }

  private bindForm() {
    this.gatewayForm = this.formBuilder.group({
      gatewayID: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regGeneralField)
      ])],
      gatewayName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regGeneralField),
      ])],
      variantID: [null, Validators.compose([
        Validators.required
      ])],
    });
  }


  getTotalAlarmsStatuses() {
    this.gatewayService.getVariants().subscribe(
      data => {
        this.variantModel = data.Data;
      },
      error => {
      });
  }


  save() {
    this.gatewayService.addGateway(this.gatewayForm.value).subscribe(
      data => {
        this.toastrService.success('Gateway saved successfully!');
        this.close();
      },
      error => {
      });
  }

  close() {
    this.ngbActiveModal.close();
  }


}
