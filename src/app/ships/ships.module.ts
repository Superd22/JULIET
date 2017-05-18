import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MainViewComponent } from './components/main-view/main-view.component';
import { AdminTypesComponent } from './components/admin-types/admin-types.component';
import { HangarAdminATypeComponent } from './components/admin-types/a-type/a-type.component';
import { HangarAdminTypesEditorComponent } from './components/admin-types/editor/editor.component';
import { ShipModelWithoutParentPipe } from './pipes/ship-model-without-parent.pipe';
import { SingleShipViewverComponent } from './components/single/single.component';
import { JulietHangarService } from "./services/juliet-hangar.service";

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
  providers: [JulietShipsService, JulietHangarService],
  declarations: [ShipsComponent, HangarComponent, MyShipsComponent, AShipLabelComponent, MainViewComponent,
    AdminTypesComponent, HangarAdminTypesEditorComponent, HangarAdminATypeComponent, ShipModelWithoutParentPipe,
    SingleShipViewverComponent],
  exports: [MyShipsComponent],
})
export class ShipsModule { }
