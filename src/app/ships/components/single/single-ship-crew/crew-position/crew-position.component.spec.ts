import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewPositionComponent } from './crew-position.component';

describe('CrewPositionComponent', () => {
  let component: CrewPositionComponent;
  let fixture: ComponentFixture<CrewPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
