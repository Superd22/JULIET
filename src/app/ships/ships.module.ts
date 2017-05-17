import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JulietShipsService } from './services/juliet-ships.service';
import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { STATES } from './states/_.states';
import { UIRouterModule } from '@uirouter/angular';
import { JulietMaterialModule } from './../juliet-common/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsComponent } from './ships.component';
import { HangarComponent } from './components/hangar/hangar.component';
import { MyShipsComponent } from './components/my-ships/my-ships.component';
import { AShipLabelComponent } from './components/my-ships/a-ship-label/a-ship-label.component';

@NgModule({
  imports: [
    CommonModule,
    JulietMaterialModule,
    JulietCommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    UIRouterModule.forChild({
      states: STATES,
    }),
  ],
  providers: [JulietShipsService],
  declarations: [ShipsComponent, HangarComponent, MyShipsComponent, AShipLabelComponent],
  exports: [MyShipsComponent],
})
export class ShipsModule { }
