import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AShipLabelComponent } from './a-ship-label.component';

describe('AShipLabelComponent', () => {
  let component: AShipLabelComponent;
  let fixture: ComponentFixture<AShipLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AShipLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AShipLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
