import { TeamSpeakModule } from './team-speak/team-speak.module';
import { MainSidenavComponent } from './juliet-common/components/main-sidenav/main-sidenav.component';
import { RouterConfig } from './config/router.config';
import { UIRouterModule } from 'ui-router-ng2';
import { StatsModule } from './stats/stats.module';
import { ShipsModule } from './ships/ships.module';
import { RightsModule } from './rights/rights.module';
import { RanksModule } from './ranks/ranks.module';
import { NotifsModule } from './notifs/notifs.module';
import { DefaultModule } from './default/default.module';
import { JulietCommonModule } from './juliet-common/juliet-common.module';
import { JuCalendarModule } from './calendar/calendar.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';
import { GroupsModule } from './groups/groups.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdMenuModule, MdMenuTrigger } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'


import { IonicApp, IonicModule } from 'ionic-angular';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainSidenavComponent,
  ],
  imports: [
    MaterialModule.forRoot(),
    MdMenuModule,
    IonicModule.forRoot(AppComponent),
    FormsModule,
    HttpModule,
    JuCalendarModule,
    DefaultModule,
    GroupsModule,
    JulietCommonModule,
    NotifsModule,
    RanksModule,
    RightsModule,
    ShipsModule,
    StatsModule,
    TeamSpeakModule,
    TagsModule,
    UserModule,
    FlexLayoutModule.forRoot(),
    UIRouterModule.forRoot({
      configClass: RouterConfig,
      useHash: !environment.production,
    }),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [IonicApp]
})
export class AppModule { }
