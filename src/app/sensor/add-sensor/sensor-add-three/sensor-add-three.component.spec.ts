import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorAddThreeComponent } from './sensor-add-three.component';

describe('SensorAddThreeComponent', () => {
  let component: SensorAddThreeComponent;
  let fixture: ComponentFixture<SensorAddThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorAddThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorAddThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
