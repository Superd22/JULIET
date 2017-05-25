import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { PrettyTagTargetTypes } from './../../../enums/pretty-tag-target-types.enum';
import { TagTarget } from './../../../interfaces/tag-target';
import { Component, OnInit, Input } from '@angular/core';
import { ATag } from '../../../interfaces/a-tag';

@Component({
  selector: 'ju-tag-owner-list',
  templateUrl: './tag-owner-list.component.html',
  styleUrls: ['./tag-owner-list.component.scss']
})
export class TagOwnerListComponent implements OnInit {

  /** tag for this owner/target list */
  @Input("tag")
  protected tag: ATag;
  /** output of our current filters */
  protected filteredTargets: {
    count: number,
    original: TagTarget[]
  } = { count: null, original: null };
  /** columns for the table */
  protected columns;
  /** current display filters */
  protected filters = {
    type: null,
    name: null,
  };

  /** enum of human readable types */
  protected prettyTargetTypes = PrettyTagTargetTypes;
  /** the types that exists in the current targets */
  protected availableTypes: string[] = [];

  constructor(protected mScrollbarService:MalihuScrollbarService) { }

  ngOnInit() {
    this.initList();
    //setTimeout(() => this.mScrollbarService.initScrollbar('.ngx-datatable.scroll-vertical  .datatable-body', { axis: 'y', theme: 'dark-thick', scrollInertia:0, scrollButtons: { enable: false } }),500);
    
  }

  protected initList() {
    this.columns = [
      { prop: "name", name: "nom" },
      { prop: "type" }
    ];

    this.initTypeFilters();
  }

  private initTypeFilters() {
    this.availableTypes = [];
    this.tag.targets.forEach((target) => {
      if (this.availableTypes.indexOf(target.type) == -1) {
        this.availableTypes.push(target.type);
      }
    });
  }

  protected isFilterActivated(filter: string) {
    return this.filters.type != null && this.filters.type.indexOf(filter) > -1;
  }

  protected resetFilters() {
    this.filters.type = null;
  }

  protected invertFilters() {
    if (this.filters.type == null) return false;
    let newTypes = [];
    this.availableTypes.forEach((type) => {
      if (this.filters.type.indexOf(type) == -1) newTypes.push(type);
    });

    this.filters.type = newTypes;
  }

  protected toggleFilter(filter: string) {
    if (this.filters.type == null) {
      // We're adding this filter
      this.filters.type = [filter];
    }
    else {
      // We want to either remove if already there or add
      let i = this.filters.type.indexOf(filter);
      if (i > -1) this.filters.type.splice(i, 1);
      else this.filters.type.push(filter);

      // make sure if we have no more filters we nullify
      if (this.filters.type.length == 0) this.filters.type = null;
    }
  }
}
