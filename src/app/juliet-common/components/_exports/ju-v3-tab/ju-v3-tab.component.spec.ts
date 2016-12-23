/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JuV3TabComponent } from './ju-v3-tab.component';

describe('JuV3TabComponent', () => {
  let component: JuV3TabComponent;
  let fixture: ComponentFixture<JuV3TabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuV3TabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuV3TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
