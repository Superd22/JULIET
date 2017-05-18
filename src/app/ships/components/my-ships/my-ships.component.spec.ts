import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShipsComponent } from './my-ships.component';

describe('MyShipsComponent', () => {
  let component: MyShipsComponent;
  let fixture: ComponentFixture<MyShipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
