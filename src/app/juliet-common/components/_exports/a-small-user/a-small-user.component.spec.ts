/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ASmallUserComponent } from './a-small-user.component';

describe('ASmallUserComponent', () => {
  let component: ASmallUserComponent;
  let fixture: ComponentFixture<ASmallUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASmallUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASmallUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
