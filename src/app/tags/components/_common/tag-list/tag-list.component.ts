import { Component, OnInit, Input } from '@angular/core';
import { ATag } from '../../../interfaces/a-tag';
import { TagsService } from '../../../services/tags.service';
import { TagsType } from '../../../enums/tags-type.enum';

@Component({
  selector: 'ju-tags-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})

export class TagListComponent implements OnInit {

  @Input("tags")
  protected tagList:ATag[];

  public filter = {
    name: null,
    restricted: null,
    type: null,
    cat: null,
  };

  protected tagType = TagsType;
  public filteredTags = {
    count: 0,
  };

  constructor(protected tagsAPI: TagsService) { }

  ngOnInit() {
  }

  protected toggleCat(catName) {
    this.filter.cat = this.filter.cat == catName ? null : catName;
  }

  protected iconForCat(catName) {
    return this.filter.cat == catName ? "check_box" : "check_box_outline_blank";
  }

  protected iconForFilter(filterName) {
    if (filterName == "restricted") return this.filter.restricted == 1 ? "check_box" : "check_box_outline_blank";
    else return this.filter.type == this.tagType[filterName] ? "check_box" : "check_box_outline_blank";
  }

  protected toggleFilter(filterName) {
    if (filterName == "restricted") this.filter.restricted = this.filter.restricted === null ? 1 : null;
    else this.filter.type = this.filter.type == this.tagType[filterName] ? null : this.tagType[filterName];
  }

}
