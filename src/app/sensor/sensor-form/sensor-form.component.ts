import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorService } from '../shared/sensor.service';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrls: ['./sensor-form.component.scss']
})
export class SensorFormComponent implements OnInit {

  constructor(
    private sensorService: SensorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addSensor(){
    this.router.navigate(['app', 'sensor', 'add']);
  }

}
