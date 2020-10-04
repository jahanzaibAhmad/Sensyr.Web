import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { GatewayAddComponent } from '../gateway-add/gateway-add.component';

@Component({
  selector: 'app-gateway-form',
  templateUrl: './gateway-form.component.html',
  styleUrls: ['./gateway-form.component.scss']
})
export class GatewayFormComponent implements OnInit {

  gatewayTableForm: FormGroup;
  @Output() searchClick = new EventEmitter<{ searchText: any }>();
  constructor(
    private ngbModal: NgbModal,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.bindForm();
  }

  private bindForm() {
    this.gatewayTableForm = this.formBuilder.group({
      searchText: ['']
    });
  }


  openGatewayAdd() {
    const modalRef = this.ngbModal.open(GatewayAddComponent, {
      size: 'lg',
      windowClass: 'gateway-modal',
      backdrop: true,
      keyboard: false,
    });
    modalRef.result.then((result) => {
      this.searchClick.emit(null);
    }).catch((error) => {
      console.log(error);
    });
  }


  search() {
    const searchText = this.gatewayTableForm.value.searchText;
    if (!(searchText === '' && searchText == null)) {
      this.searchClick.emit(searchText);
    }
  }

}
