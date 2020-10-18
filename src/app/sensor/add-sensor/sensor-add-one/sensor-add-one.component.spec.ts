import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorAddOneComponent } from './sensor-add-one.component';

describe('SensorAddOneComponent', () => {
  let component: SensorAddOneComponent;
  let fixture: ComponentFixture<SensorAddOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorAddOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorAddOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
