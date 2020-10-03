import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { GatewayAddComponent } from '../gateway-add/gateway-add.component';

@Component({
  selector: 'app-gateway-form',
  templateUrl: './gateway-form.component.html',
  styleUrls: ['./gateway-form.component.scss']
})
export class GatewayFormComponent implements OnInit {

  constructor(
    private ngbModal: NgbModal,

  ) { }

  ngOnInit(): void {
  }


  openGatewayAdd() {
    const modalRef = this.ngbModal.open(GatewayAddComponent, {
      size: 'lg',
      windowClass: 'gateway-modal',
      backdrop: true,
      keyboard: false,
    });
    modalRef.result.then((result) => {
    }).catch((error) => {
      console.log(error);
    });
  }

}
