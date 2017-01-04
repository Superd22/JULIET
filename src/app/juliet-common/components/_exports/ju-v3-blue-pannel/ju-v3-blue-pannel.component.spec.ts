/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JuV3BluePannelComponent } from './ju-v3-blue-pannel.component';

describe('JuV3BluePannelComponent', () => {
  let component: JuV3BluePannelComponent;
  let fixture: ComponentFixture<JuV3BluePannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuV3BluePannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuV3BluePannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
