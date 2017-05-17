import { JulietShipsService } from './services/juliet-ships.service';
import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { STATES } from './states/_.states';
import { UIRouterModule } from '@uirouter/angular';
import { JulietMaterialModule } from './../juliet-common/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsComponent } from './ships.component';
import { HangarComponent } from './components/hangar/hangar.component';

@NgModule({
  imports: [
    CommonModule,
    JulietMaterialModule,
    JulietCommonModule,
    UIRouterModule.forChild({
      states: STATES,
    }),
  ],
  providers: [JulietShipsService],
  declarations: [ShipsComponent, HangarComponent]
})
export class ShipsModule { }
