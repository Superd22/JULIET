import { StateService } from '@uirouter/angular';
import { FilterPipe } from './../../../juliet-common/pipes/filter.pipe';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TagsType } from './../../enums/tags-type.enum';
import { TagListComponent } from '../_common/tag-list/tag-list.component';
import { TagsService } from '../../services/tags.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild("TagList") TagList:TagListComponent;
  private creating: Boolean = false;

  constructor(public tagsAPI:TagsService, public state:StateService) {}

  private addTag() {
    if (this.TagList.filter && this.TagList.filter.name) {
      this.creating = true;
      let name = this.TagList.filter.name;
      this.tagsAPI.createTag(this.TagList.filter.name).subscribe(
        data => {
          if (data) this.state.go("secure.Tags.view", { tag_name: name, cat_name: data.cat });
          else this.creating = false;
        }
      )
    }
  }

  ngOnInit() {
    this.tagsAPI.getTags();
  }

}
