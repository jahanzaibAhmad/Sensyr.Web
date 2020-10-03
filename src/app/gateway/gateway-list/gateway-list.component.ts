import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { GatewayListModel } from '@app/gateway/shared/gateway.model';
import { ToastrService } from 'ngx-toastr';
import { GatewayService } from '../shared/gateway.service';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit {
  gatewayListModel: GatewayListModel[] = [];
  @Input() private searchClick: EventEmitter<any>;
  searchText: string;

  constructor(
    private gatewayService: GatewayService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getGateways();
    this.searchEvent();
  }


  searchEvent() {
    this.searchClick.subscribe(
      data => {
        this.getGateways(data);
      }
    );
  }

  getGateways(searchText?) {
    this.gatewayService.getGateways(searchText).subscribe(
      data => {
        this.gatewayListModel = data.Data;
        console.log(data.Data[1])
      },
      error => {
      });
  }

}
