import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RanksComponent } from './components/ranks.component';
import { UIRouterModule } from 'ui-router-ng2';

import {STATES} from './states/_.states'; 

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [RanksComponent]
})
export class RanksModule { }
