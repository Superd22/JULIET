/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JuV3PannelComponent } from './ju-v3-pannel.component';

describe('JuV3PannelComponent', () => {
  let component: JuV3PannelComponent;
  let fixture: ComponentFixture<JuV3PannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuV3PannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuV3PannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
