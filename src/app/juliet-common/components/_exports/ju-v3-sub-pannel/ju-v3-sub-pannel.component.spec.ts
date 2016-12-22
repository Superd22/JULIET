/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JuV3SubPannelComponent } from './ju-v3-sub-pannel.component';

describe('JuV3SubPannelComponent', () => {
  let component: JuV3SubPannelComponent;
  let fixture: ComponentFixture<JuV3SubPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuV3SubPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuV3SubPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
