/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ATagComponent } from './a-tag.component';

describe('ATagComponent', () => {
  let component: ATagComponent;
  let fixture: ComponentFixture<ATagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ATagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ATagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
