import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RanksComponent } from './components/ranks.component';
import { UIRouterModule } from '@uirouter/angular';

import {STATES} from './states/_.states'; 

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({
            states: STATES,
    }),
    JulietCommonModule
  ],
  declarations: [RanksComponent]
})
export class JulietRanksModule { }
