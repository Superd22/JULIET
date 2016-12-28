import { Component, OnInit, Input } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { ATag } from '../../interfaces/a-tag';
import { AUser } from '../../../user/interfaces/a-user';



@Component({
  selector: 'ju-tag-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  @Input("user")
  protected _userId:Number; 
  @Input("user")
  protected _user:AUser;
  protected tagsList:ATag[];
  protected searchList:ATag[];

  protected filteredTags = {
    count: null
  };

  constructor(public api:TagsService) {
    if(this._user) this._userId = this._user.id_forum;
  }


  ngOnInit() {
    this.api.getUserTags(this._userId).subscribe(
      data => this.tagsList = data
    );

    this.api.getTags();
  }

}
