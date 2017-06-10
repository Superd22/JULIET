import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewContainerComponent } from './crew-container.component';

describe('CrewContainerComponent', () => {
  let component: CrewContainerComponent;
  let fixture: ComponentFixture<CrewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
