import { FilterPipe } from './../../../juliet-common/pipes/filter.pipe';
import { TagsService } from './../../services/tags.service';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { TagsType } from './../../enums/tags-type.enum';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public filter = {
    name: null,
    restricted: null,
    type: null,
    cat: null,
  };

  private tagType = TagsType;
  public filteredTags = {
    count: 0,
  };


  constructor(private tagsAPI: TagsService) { }

  ngOnInit() {
    console.log(this.tagsAPI);
    this.tagsAPI.getTags();
  }

  private toggleCat(catName) {
    this.filter.cat = this.filter.cat == catName ? null : catName;
  }

  private iconForCat(catName) {
    return this.filter.cat == catName ? "check_box" : "check_box_outline_blank";
  }

  private iconForFilter(filterName) {
    if (filterName == "restricted") return this.filter.restricted == 1 ? "check_box" : "check_box_outline_blank";
    else return this.filter.type == this.tagType[filterName] ? "check_box" : "check_box_outline_blank";
  }

  private toggleFilter(filterName) {
    if (filterName == "restricted") this.filter.restricted = this.filter.restricted === null ? 1 : null;
    else this.filter.type = this.filter.type == this.tagType[filterName] ? null : this.tagType[filterName];
  }

}
