/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RankBigComponent } from './rank-big.component';

describe('RankBigComponent', () => {
  let component: RankBigComponent;
  let fixture: ComponentFixture<RankBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
