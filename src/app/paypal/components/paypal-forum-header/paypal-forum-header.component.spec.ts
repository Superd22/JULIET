import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalForumHeaderComponent } from './paypal-forum-header.component';

describe('PaypalForumHeaderComponent', () => {
  let component: PaypalForumHeaderComponent;
  let fixture: ComponentFixture<PaypalForumHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalForumHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalForumHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
