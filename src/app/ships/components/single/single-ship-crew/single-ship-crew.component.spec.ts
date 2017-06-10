import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShipCrewComponent } from './single-ship-crew.component';

describe('SingleShipCrewComponent', () => {
  let component: SingleShipCrewComponent;
  let fixture: ComponentFixture<SingleShipCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShipCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShipCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
