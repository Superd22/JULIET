import { JulietPaypalModule } from './paypal/paypal.module';
import { CdkTableModule } from '@angular/cdk/table';
import { JulietMaterialModule } from './juliet-common/material/material.module';
import { JulietTeamSpeakModule } from './team-speak/team-speak.module';
import { MainSidenavComponent } from './juliet-common/components/main-sidenav/main-sidenav.component';
import { RouterConfig } from './config/router.config';
import { UIRouterModule } from '@uirouter/angular';
import { JulietStatsModule } from './stats/stats.module';
import { JulietShipsModule } from './ships/ships.module';
import { JulietRightsModule } from './rights/rights.module';
import { JulietRanksModule } from './ranks/ranks.module';
import { JulietNotifsModule } from './notifs/notifs.module';
import { JulietDefaultModule } from './default/default.module';
import { JulietCommonModule } from './juliet-common/juliet-common.module';
import { JulietCalendarModule } from './calendar/calendar.module';
import { JulietUserModule } from './user/user.module';
import { JulietTagsModule } from './tags/tags.module';
import { JulietGroupsModule } from './groups/groups.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  MdMenuModule, MdMenuTrigger } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'
import { JulietAppComponent } from './app.component';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    JulietAppComponent,
    MainSidenavComponent,
  ],
  imports: [
    UIRouterModule.forRoot({
      config: RouterConfig,
      useHash: !environment.production,
    }),
    BrowserModule,
    CdkTableModule,
    JulietMaterialModule,
    FormsModule,
    HttpModule,
    JulietCalendarModule,
    JulietDefaultModule,
    JulietGroupsModule,
    JulietCommonModule,
    JulietNotifsModule,
    JulietRanksModule,
    JulietRightsModule,
    JulietShipsModule,
    JulietStatsModule,
    JulietTeamSpeakModule,
    JulietTagsModule,
    JulietUserModule,
    JulietPaypalModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [JulietAppComponent]
})
export class JulietAppModule { }
