import { JulietMaterialModule } from './../juliet-common/material/material.module';
import { JulietTeamSpeakModule } from './../team-speak/team-speak.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { JulietPaypalModule } from './../paypal/paypal.module';
import { JuV3PannelComponent } from './../juliet-common/components/_exports/ju-v3-pannel/ju-v3-pannel.component';
import { STATES } from './states/_.states';

import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';
import { FormsModule } from "@angular/forms/";

@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule,
    JulietMaterialModule,
    UIRouterModule.forChild({
      states: STATES,
    }),
    JulietPaypalModule,
    FlexLayoutModule,
    JulietTeamSpeakModule,
    FormsModule
  ],
  declarations: [DefaultComponent],
  entryComponents: [],
  bootstrap: [ ]
})
export class JulietDefaultModule { }
