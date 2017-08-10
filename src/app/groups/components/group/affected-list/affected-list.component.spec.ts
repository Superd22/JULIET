import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuGroupAffectedListComponent } from './affected-list.component';

describe('AffectedListComponent', () => {
  let component: JuGroupAffectedListComponent;
  let fixture: ComponentFixture<JuGroupAffectedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuGroupAffectedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuGroupAffectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
