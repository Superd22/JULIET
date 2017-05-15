import { TeamSpeakModule } from './../team-speak/team-speak.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { JuV3PannelComponent } from './../juliet-common/components/_exports/ju-v3-pannel/ju-v3-pannel.component';
import { STATES } from './states/_.states';

import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';

@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule,
    UIRouterModule.forChild({
      states: STATES,
    }),
    MaterialModule,
    FlexLayoutModule,
    TeamSpeakModule
  ],
  declarations: [DefaultComponent],
  bootstrap: [
    ]
})
export class DefaultModule { }
