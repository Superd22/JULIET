import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule
  ],
  declarations: [CalendarComponent]
})
export class JulietCalendarModule { }
