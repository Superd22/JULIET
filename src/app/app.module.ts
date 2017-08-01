import { JulietMaterialModule } from './juliet-common/material/material.module';
import { TeamSpeakModule } from './team-speak/team-speak.module';
import { MainSidenavComponent } from './juliet-common/components/main-sidenav/main-sidenav.component';
import { RouterConfig } from './config/router.config';
import { UIRouterModule } from '@uirouter/angular';
import { StatsModule } from './stats/stats.module';
import { ShipsModule } from './ships/ships.module';
import { RightsModule } from './rights/rights.module';
import { RanksModule } from './ranks/ranks.module';
import { NotifsModule } from './notifs/notifs.module';
import { DefaultModule } from './default/default.module';
import { JulietCommonModule } from './juliet-common/juliet-common.module';
import { CalendarModule } from './calendar/calendar.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';
import { GroupsModule } from './groups/groups.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  MdMenuModule, MdMenuTrigger } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

@NgModule({
  declarations: [
    AppComponent,
    MainSidenavComponent,
  ],
  imports: [
    UIRouterModule.forRoot({
      config: RouterConfig,
      //useHash: !environment.production,
    }),
    BrowserModule,
    JulietMaterialModule,
    FormsModule,
    HttpModule,
    CalendarModule,
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
    BrowserAnimationsModule,
    FlexLayoutModule,
    MalihuScrollbarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
