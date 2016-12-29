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
  @Input("userId")
  protected _userId:Number=0; 
  @Input("user")
  protected _user:AUser;
  protected tagsList:ATag[];
  protected searchList:ATag[];

  protected filteredTags = {
    count: null
  };

  private _fetchedFor:Number=-1;

  constructor(public api:TagsService) {}


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
      this.api.getUserTags(this._userId).subscribe(
        data => this.tagsList = data
      );

      this._fetchedFor = this._userId;
    }
    
  }

}
