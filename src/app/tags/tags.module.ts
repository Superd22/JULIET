import { TagsIndexComponent } from './components/main/tag-index.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SingleComponent } from './components/single/single.component';
import { ATagComponent } from './components/_common/a-tag/a-tag.component';
import { MaterialModule } from '@angular/material';
import { TagsService } from './services/tags.service';
import { ListComponent } from './components/list/list.component';
import { JulietCommonModule } from './../juliet-common/juliet-common.module';
import { STATES } from './states/_.states';
import { UIRouterModule } from 'ui-router-ng2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './components/main/tags.component';
import { OwnerComponent } from './components/owner/owner.component';
import { SearchComponent } from './components/search/search.component';
import { Ng2PaginationModule }  from 'ng2-pagination';
import { Ng2CompleterModule } from "ng2-completer";
import { TagListComponent } from './components/_common/tag-list/tag-list.component';



@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule,
    UIRouterModule.forChild({
      states: STATES,
    }),
    MaterialModule,
    FlexLayoutModule,
    Ng2PaginationModule,
    FormsModule,
    Ng2CompleterModule
  ],
  declarations: [
    TagsComponent, OwnerComponent, SearchComponent, ListComponent, ATagComponent, SingleComponent,
    TagsIndexComponent, TagListComponent,
  ],
  providers: [TagsService]
})
export class TagsModule { }
