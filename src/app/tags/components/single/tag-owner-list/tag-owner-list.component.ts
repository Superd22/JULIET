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
  protected tag:ATag;
  /** columns for  */
  protected columns;
  protected rows;

  constructor() { }

  ngOnInit() {
    this.initList();
  }

  protected initList() {
    this.columns = [
      {prop:"name",name:"nom"},
      {prop:"type"}
    ];
    this.rows = this.tag.targets;
  }

}
