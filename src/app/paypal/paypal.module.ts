import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalForumHeaderComponent } from './components/paypal-forum-header/paypal-forum-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaypalForumHeaderComponent],
  exports: [PaypalForumHeaderComponent],
})
export class PaypalModule { }
