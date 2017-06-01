import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagOwnerListComponent } from './tag-owner-list.component';

describe('TagOwnerListComponent', () => {
  let component: TagOwnerListComponent;
  let fixture: ComponentFixture<TagOwnerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagOwnerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
