import { JulietCalendarService } from './services/juliet-calendar.service';
import { WeekComponent } from './components/list/week/week.component';
import { DayComponent } from './components/list/day/day.component';
import { MonthComponent } from './components/list/month/month.component';
import { ViewSelectorComponent } from './components/list/view-selector/view-selector.component';
import { MainComponent } from './components/index/main/main.component';
import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { STATES } from './states/_.states';
import { UIRouterModule } from 'ui-router-ng2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    JulietCommonModule,
    UIRouterModule.forChild({
      states: STATES,
    }),
    CalendarModule.forRoot(),
  ],
  declarations: [
    CalendarComponent, MainComponent, ViewSelectorComponent, MonthComponent, DayComponent, WeekComponent,
  ],
  providers: [JulietCalendarService],
})
export class JuCalendarModule { }
