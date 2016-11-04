import { STATES } from './states/_.states';

import { UIRouterModule } from 'ui-router-ng2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({
      states: STATES,
    })
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
