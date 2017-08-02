import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { STATES } from './states/_.states';
import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/group/group.component';
import { ListeComponent } from './components/liste/liste.component';

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({
      states: STATES
    }),
    JulietCommonModule
  ],
  declarations: [GroupsComponent, GroupComponent, ListeComponent]
})
export class JulietGroupsModule { }
