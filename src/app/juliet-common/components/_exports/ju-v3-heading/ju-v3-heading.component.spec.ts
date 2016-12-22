/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JuV3HeadingComponent } from './ju-v3-heading.component';

describe('JuV3HeadingComponent', () => {
  let component: JuV3HeadingComponent;
  let fixture: ComponentFixture<JuV3HeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuV3HeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuV3HeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
