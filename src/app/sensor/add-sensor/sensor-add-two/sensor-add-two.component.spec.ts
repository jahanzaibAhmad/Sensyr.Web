import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorAddTwoComponent } from './sensor-add-two.component';

describe('SensorAddTwoComponent', () => {
  let component: SensorAddTwoComponent;
  let fixture: ComponentFixture<SensorAddTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorAddTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorAddTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
