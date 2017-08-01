import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagOwnerTargetComponent } from './tag-owner-target.component';

describe('TagOwnerTargetComponent', () => {
  let component: TagOwnerTargetComponent;
  let fixture: ComponentFixture<TagOwnerTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagOwnerTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagOwnerTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
