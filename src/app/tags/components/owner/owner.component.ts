import { Component, OnInit, Input } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { ATag } from '../../interfaces/a-tag';

@Component({
  selector: 'tags-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  @Input("user")
  protected _userId:Number;
  protected tagsList:ATag[];
  protected searchList:ATag[];

  protected filteredTags = {
    count: null
  };

  constructor(public api:TagsService) { }

  ngOnInit() {
    this.api.getUserTags(this._userId).subscribe(
      data => this.tagsList = data
    );

    this.api.getTags();
  }

}
