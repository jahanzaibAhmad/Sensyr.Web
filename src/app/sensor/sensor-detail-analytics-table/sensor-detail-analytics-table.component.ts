import { Component, OnInit } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { ActivatedRoute } from '@angular/router';
import { SensorStatusEnum, SharedService } from '@app/shared/services';

@Component({
  selector: 'app-sensor-detail-analytics-table',
  templateUrl: './sensor-detail-analytics-table.component.html',
  styleUrls: ['./sensor-detail-analytics-table.component.scss']
})
export class SensorDetailAnalyticsTableComponent implements OnInit {
  lastTransactionsModel: any[];
  sensorId: number;
  alarmModel: [];
  sensorStatusEnum: typeof SensorStatusEnum;
  constructor(
    private sensorService: SensorService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sensorId = +this.activatedRoute.snapshot.params.sensorId;
    this.sensorStatusEnum = SensorStatusEnum;
    this.getSensorDetailLastTransactions();

  }

  getSensorDetailLastTransactions() {
    this.lastTransactionsModel = [];
    this.sensorService.getSensorDetailLastTransactions(this.sensorId).subscribe(
      data => {
        console.log(data);
        this.alarmModel = data.Data;
      },
      error => {
      });
  }



}
