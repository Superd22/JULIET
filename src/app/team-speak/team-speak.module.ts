import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { STATES } from './states/_.states';
import { UIRouterModule } from '@uirouter/angular';
import { JulietTsService } from './services/juliet-ts.service';
import { TsMainComponent } from './components/ts-main/ts-main.component';
import { TsServerStatusComponent } from './components/ts-server-status/ts-server-status.component';
import { TsRegisterStatusComponent } from './components/ts-register-status/ts-register-status.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({
      states: STATES,
    }),
    JulietCommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [TsRegisterStatusComponent],
  declarations: [TsRegisterStatusComponent, TsServerStatusComponent, TsMainComponent],
  providers: [JulietTsService],
})
export class TeamSpeakModule { }
