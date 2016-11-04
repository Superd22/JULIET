/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JulietCommonComponent } from './components/juliet-common.component';

describe('JulietCommonComponent', () => {
  let component: JulietCommonComponent;
  let fixture: ComponentFixture<JulietCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JulietCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JulietCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
