import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifsComponent } from './notifs.component';

@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule
  ],
  declarations: [NotifsComponent]
})
export class JulietNotifsModule { }
