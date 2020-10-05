import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() data;

  variantModel: VariantModel[] = [];
  isEdit: boolean;
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private gatewayService: GatewayService,
    private toastrService: ToastrService,
    private validationService: ValidationService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.getGatewayById();
    }
    this.getVariants();
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


  getVariants() {
    this.gatewayService.getVariants().subscribe(
      data => {
        this.variantModel = data.Data;
      },
      error => {
      });
  }

  getGatewayById() {
    this.gatewayService.getGatewayById(this.data.GatewayID).subscribe(
      data => {
        this.setValues( data.Data);
      },
      error => {
      });
  }

  private setValues(data) {
    this.gatewayForm.get('gatewayID').patchValue(data.GatewayID);
    this.gatewayForm.get('gatewayName').patchValue(data.GatewayName);
    this.gatewayForm.get('gatewayID').disable();
    this.gatewayForm.get('variantID').patchValue(data.VariantId);
  }

  save() {
    if (this.isEdit) {
      this.gatewayForm.value.gatewayID = this.data.GatewayID;
      this.gatewayService.UpdateGateway(this.gatewayForm.value).subscribe(
        data => {
          this.toastrService.success('Gateway updated successfully!');
          this.close();
        },
        error => {
        });
    } else {
      this.gatewayService.addGateway(this.gatewayForm.value).subscribe(
        data => {
          this.toastrService.success('Gateway saved successfully!');
          this.close();
        },
        error => {
        });
    }
  }

  close() {
    this.ngbActiveModal.close();
  }


}
