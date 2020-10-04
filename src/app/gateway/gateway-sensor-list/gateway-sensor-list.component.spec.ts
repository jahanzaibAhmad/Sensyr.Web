import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaySensorListComponent } from './gateway-sensor-list.component';

describe('GatewaySensorListComponent', () => {
  let component: GatewaySensorListComponent;
  let fixture: ComponentFixture<GatewaySensorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewaySensorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaySensorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
