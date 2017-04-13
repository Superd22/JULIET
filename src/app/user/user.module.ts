import { StarsComponent } from './components/rank-big/stars/stars.component';
import { RankSelectorComponent } from './components/rank-selector/rank-selector.component';
import { RankBigComponent } from './components/rank-big/rank-big.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { JulietCommonModule } from '../juliet-common/juliet-common.module';
import { UIRouterModule } from 'ui-router-ng2';
import { STATES } from './states/_.states';
import { UserComponent } from './components/user.component';
import { TagsModule } from '../tags/tags.module';
import { JulietUserService } from './services/juliet-user.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule,
    MaterialModule,
    FlexLayoutModule,
    TagsModule,
    FormsModule,
  ],
  providers: [JulietUserService],
  declarations: [
    UserComponent, RankBigComponent, RankSelectorComponent, StarsComponent
    ]
})
export class UserModule { }
