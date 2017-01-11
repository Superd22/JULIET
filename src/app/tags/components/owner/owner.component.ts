import { Component, OnInit, Input } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { ATag } from '../../interfaces/a-tag';
import { AUser } from '../../../user/interfaces/a-user';
import { JulietRightsService } from '../../../juliet-common/services/juliet-rights.service';



@Component({
  selector: 'ju-tag-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  @Input("userId")
  protected _userId:Number=0; 
  @Input("user")
  protected _user:AUser;
  protected tagsList:ATag[];
  protected searchList:ATag[];
  protected currentUserCan:Boolean = false;

  protected filteredTags = {
    count: null
  };

  private _fetchedFor:Number=-1;

  constructor(public api:TagsService, protected rights: JulietRightsService) {}


  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  protected init() {
    if(this._user && this._user.id_forum) this._userId = this._user.id_forum;

    if(this._fetchedFor == -1) this.api.getTags();
    if(this._userId != this._fetchedFor) {

      // Get TAGS for _userId
      this.api.getUserTags(this._userId).subscribe(
        data => this.tagsList = data
      );

      // Check whever we can edit those tags.
      this.api.has_admin(this._userId).subscribe(
        data => this.currentUserCan = data
      );

      this._fetchedFor = this._userId;
    } 
  }
  
  /* Triggered when a given tag is taken by the user. */
  protected tookTag(tag:ATag) {
    this.tagsList.push(tag);
  }

}
