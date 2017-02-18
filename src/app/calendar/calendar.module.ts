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
import { ArchiveComponent } from './components/list/archive/archive.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import 'moment/min/locales';
import { PhpToJsTimeStampPipe } from './pipes/php-to-js-time-stamp.pipe';
import { EventComponent } from './components/single/event/event.component';
import { AEventComponent } from './components/single/event/a-event/a-event.component';
import { EventInvitComponent } from './components/single/event/event-invit/event-invit.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2CompleterModule } from 'ng2-completer';

moment.locale('fr-fr');
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
    Ng2PaginationModule,
    FormsModule,
    MomentModule,
    NgbModule,
    Ng2CompleterModule,
  ],
  declarations: [
    CalendarComponent, MainComponent, ViewSelectorComponent, MonthComponent, DayComponent, WeekComponent,
    ArchiveComponent, PhpToJsTimeStampPipe, EventComponent, AEventComponent, EventInvitComponent
  ],
  providers: [JulietCalendarService],
})

export class JuCalendarModule { }
