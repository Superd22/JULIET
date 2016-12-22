import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { JuV3PannelComponent } from './../juliet-common/components/_exports/ju-v3-pannel/ju-v3-pannel.component';
import { STATES } from './states/_.states';

import { UIRouterModule } from 'ui-router-ng2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';

@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule,
    UIRouterModule.forChild({
      states: STATES,
    })
  ],
  declarations: [DefaultComponent],
  bootstrap: [
    ]
})
export class DefaultModule { }
