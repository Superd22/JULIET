import { JulietShipsModule } from './../ships/ships.module';
import { StarsComponent } from './components/rank-big/stars/stars.component';
import { RankSelectorComponent } from './components/rank-selector/rank-selector.component';
import { RankBigComponent } from './components/rank-big/rank-big.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { JulietCommonModule } from '../juliet-common/juliet-common.module';
import { UIRouterModule } from '@uirouter/angular';
import { STATES } from './states/_.states';
import { UserComponent } from './components/user.component';
import { JulietTagsModule } from '../tags/tags.module';
import { JulietUserService } from './services/juliet-user.service';
import { FormsModule } from '@angular/forms';
import { JulietMaterialModule } from './../juliet-common/material/material.module';


@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule,
    JulietMaterialModule,
    FlexLayoutModule,
    UIRouterModule.forChild({
      states: STATES
    }),
    JulietTagsModule,
    FormsModule,
    JulietShipsModule,
  ],
  providers: [JulietUserService],
  declarations: [
    UserComponent, RankBigComponent, RankSelectorComponent, StarsComponent
  ]
})
export class JulietUserModule { }
