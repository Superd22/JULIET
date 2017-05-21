import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShipVariantsComponent } from './single-ship-variants.component';

describe('SingleShipVariantsComponent', () => {
  let component: SingleShipVariantsComponent;
  let fixture: ComponentFixture<SingleShipVariantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShipVariantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShipVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
