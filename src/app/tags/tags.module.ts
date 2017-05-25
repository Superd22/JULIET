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
import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './components/main/tags.component';
import { OwnerComponent } from './components/owner/owner.component';
import { SearchComponent } from './components/search/search.component';
import { NgxPaginationModule }  from 'ngx-pagination';
import { Ng2CompleterModule } from "ng2-completer";
import { TagListComponent } from './components/_common/tag-list/tag-list.component';
import { ExcludeTagsPipe } from './pipes/exclude-tags.pipe';
import { JulietMaterialModule } from './../juliet-common/material/material.module';
import { TagOwnerListComponent } from './components/single/tag-owner-list/tag-owner-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagOwnerTargetComponent } from './components/single/tag-owner-list/tag-owner-target/tag-owner-target.component';
import { TargetListFilterPipe } from './pipes/target-list-filter.pipe';



@NgModule({
  imports: [
    CommonModule,
    JulietCommonModule,
    JulietMaterialModule,
    UIRouterModule.forChild({
      states: STATES,
    }),
    NgxDatatableModule,
    FlexLayoutModule,
    NgxPaginationModule,
    FormsModule,
    Ng2CompleterModule
  ],
  declarations: [
    TagsComponent, OwnerComponent, SearchComponent, ListComponent, ATagComponent, SingleComponent,
    TagsIndexComponent, TagListComponent, ExcludeTagsPipe, TagOwnerListComponent, TagOwnerTargetComponent, TargetListFilterPipe,
  ],
  exports: [
    OwnerComponent, TagListComponent, ExcludeTagsPipe, ATagComponent
  ],
  providers: [TagsService]
})
export class TagsModule { }
