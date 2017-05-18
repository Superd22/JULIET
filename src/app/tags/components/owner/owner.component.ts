import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { ATag } from '../../interfaces/a-tag';
import { AUser } from '../../../user/interfaces/a-user';
import { JulietRightsService } from '../../../juliet-common/services/juliet-rights.service';
import { TagListComponent } from '../_common/tag-list/tag-list.component';



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
  public tagsList:ATag[];
  protected searchList:ATag[];
  public currentUserCan:Boolean = false;

  @ViewChild(TagListComponent)
  protected tagList: TagListComponent;

  protected filteredTags = {
    count: null,
    original: null,
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
      this.fetchTagList();

      // Check whever we can edit those tags.
      this.rights.user_can("USER_CAN_ADMIN_TAGS", this._userId).subscribe(
        data => this.currentUserCan = data.data
      );

      this._fetchedFor = this._userId;
    } 
  }

  protected fetchTagList() {
    this.api.getUserTags(this._userId).subscribe(
      data => this.tagsList = data
    );
  }

  /* Triggered when a given tag is taken by the user. */
  public tagTaken(tag:ATag) {
    console.log(tag);
    this.api.assignTag(tag,this._userId);
    this.tagsList.push(tag);
  }

  public tagUnTaken(tag:ATag) {
    this.api.unAssignTag(tag, this._userId);
    this.tagsList.splice(this.tagsList.findIndex( cur => cur.id === tag.id ), 1);
  }

  protected addTag() {
    this.api.createTag(this.tagList.filter.name).subscribe(
      tag => {
        this.api.assignTag(tag, this._userId);
        this.tagList.filter.name = "";
        this.fetchTagList();
      }
    );
  }

  public shouldAddTag() {
    if(this.tagList.searchHasExactMatch() || !(this.tagList.filter.name) ) return false;

    let filtered = this.filteredTags.original;
    if(filtered && filtered.filter(tag => tag.name.toLowerCase() === this.tagList.filter.name.toLowerCase().trim()).length > 0) 
    return false;

    return true;
  }

}
