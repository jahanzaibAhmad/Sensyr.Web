import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorService } from '@app/sensor/shared/sensor.service';

@Component({
  selector: 'app-sensor-add-two',
  templateUrl: './sensor-add-two.component.html',
  styleUrls: ['./sensor-add-two.component.scss']
})
export class SensorAddTwoComponent implements OnInit {

  constructor(
    private sensorService: SensorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  save() {
    this.router.navigate(['app', 'sensor', 'add', '1', '1']);
    setTimeout(() => {
      document.getElementById('nav-step-3-tab').click();
    }, 10);

  }

}
