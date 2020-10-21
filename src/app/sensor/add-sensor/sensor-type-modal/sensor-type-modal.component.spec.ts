import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorTypeModalComponent } from './sensor-type-modal.component';

describe('SensorTypeModalComponent', () => {
  let component: SensorTypeModalComponent;
  let fixture: ComponentFixture<SensorTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
