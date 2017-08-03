
import { JulietMaterialModule } from './../juliet-common/material/material.module';
import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { STATES } from './states/_.states';
import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './components/groups/groups.component';
import { JuV3FullGroupComponent } from './components/group/group.component';
import { ListeComponent } from './components/liste/liste.component';
import { JulietGroupsService } from './services/juliet-groups.service';

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({
      states: STATES
    }),
    JulietCommonModule,
    JulietMaterialModule
  ],
  providers: [JulietGroupsService],
  declarations: [GroupsComponent, JuV3FullGroupComponent, ListeComponent]
})
export class JulietGroupsModule { }
