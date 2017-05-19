import { ShipModel } from './../../../ships/interfaces/ship-model';
import { AShip } from './../../../ships/interfaces/a-ship';
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
  protected _userId: number = null;
  @Input("user")
  protected _user: AUser = null;

  @Input()
  protected ship: AShip = null;
  @Input()
  protected shipModel: ShipModel = null;

  public tagsList: ATag[];
  protected searchList: ATag[];
  public currentUserCan: Boolean = false;

  @ViewChild(TagListComponent)
  protected tagList: TagListComponent;

  protected filteredTags = {
    count: null,
    original: null,
  };

  public busy: boolean = false;

  private _fetchedFor: { type: "user" | "ship" | "shipModel", target: number } = { type: null, target: null };

  constructor(public api: TagsService, protected rights: JulietRightsService) { }


  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  /**
   * Initiliaze the system for the target
   */
  protected init() {
    if (this._user && this._user.id_forum) this._userId = this._user.id_forum;

    // If this is the first time we're polling, make sure we have tags stored.
    this.api.getTags();

    switch (this.getCurrentTargetType()) {
      case "user": this.doForUser(); break;
      case "ship": this.doForShip(); break;
      case "shipModel": this.doForShipModel(); break;
    }

  }

  /**
   * Returns the current target types
   * @return user | ship | shipModel
   * @throws error on multiple targets
   */
  protected getCurrentTargetType(): "user" | "ship" | "shipModel" {
    if (this._userId != null && this.ship == null && this.shipModel == null) return "user";
    else if (this._userId == null && this.ship != null && this.shipModel == null) return "ship";
    else if (this._userId == null && this.ship == null && this.shipModel != null) return "shipModel"
    else throw "MULTIPLE OWNER TARGET TYPES";
  }

  /**
   * Initializes system for an user target
   */
  protected doForUser() {
    if (this._fetchedFor.type != "user" || this._userId != this._fetchedFor.target) {
      // Get TAGS for _userId
      this.fetchTagList();

      // Check whever we can edit those tags.
      this.rights.user_can("USER_CAN_ADMIN_TAGS", this._userId).subscribe(
        data => this.currentUserCan = data.data
      );

      this._fetchedFor = { type: "user", target: this._userId };
    }
  }

  protected doForShip() {
    if (this._fetchedFor.type != "ship" || this.ship.id != this._fetchedFor.target) {
      this.fetchTagList();

      this.rights.user_can("USER_CAN_EDIT_SHIP_TAGS", 0, this.ship.id).subscribe(
        data => this.currentUserCan = data.data
      );

      this._fetchedFor = { type: "ship", target: this.ship.id };
    }
  }

  protected doForShipModel() {
    if (this._fetchedFor.type != "shipModel" || this.shipModel.id != this._fetchedFor.target) {
      this.fetchTagList();

      this.rights.user_can("USER_CAN_ADMIN_SHIPS").subscribe(
        data => this.currentUserCan = data.data
      );

      this._fetchedFor = { type: "shipModel", target: this.ship.id };
    }
  }

  /**
   * Fetches the list of tags the current target has
   * will update tagList on each call.
   */
  protected fetchTagList() {
    let call = null;
    switch (this.getCurrentTargetType()) {
      case "user":
        call = this.api.getUserTags(this._userId);
        break;
      case "ship":
        call = this.api.getShipTags(this.ship);
        break;
      case "shipModel":
        call = this.api.getShipModelTags(this.shipModel);
        break;
    }
    if (call) {
      this.busy = true;
      call.subscribe(
        data => {
          this.tagsList = data;
          this.busy = false;
        }
      );
    }

  }

  /* Triggered when a given tag is taken by the user. */
  public tagTaken(tag: ATag) {
    console.log(tag);
    this.affectTag(tag).subscribe();
    this.tagsList.push(tag);
  }

  public tagUnTaken(tag: ATag) {
    this.unAffectTag(tag).subscribe();
    this.tagsList.splice(this.tagsList.findIndex(cur => cur.id === tag.id), 1);
  }

  private affectTag(tag: ATag) {
    switch (this.getCurrentTargetType()) {
      case "user": return this.api.assignTag(tag, this._userId);
      case "ship": return this.api.assignTagShip(tag, this.ship);
      case "shipModel": return this.api.assignTagShipModel(tag, this.shipModel);
    }
  }

  private unAffectTag(tag: ATag) {
    switch (this.getCurrentTargetType()) {
      case "user": return this.api.unAssignTag(tag, this._userId);
      case "ship": return this.api.unAssignTagShip(tag, this.ship);
      case "shipModel": return this.api.unAssignTagShipModel(tag, this.shipModel);
    }
  }

  protected addTag() {
    this.api.createTag(this.tagList.filter.name).subscribe(
      tag => {
        this.affectTag(tag).subscribe();
        this.tagList.filter.name = "";
        this.fetchTagList();
      }
    );
  }

  public shouldAddTag() {
    if (this.tagList.searchHasExactMatch() || !(this.tagList.filter.name)) return false;

    let filtered = this.filteredTags.original;
    if (filtered && filtered.filter(tag => tag.name.toLowerCase() === this.tagList.filter.name.toLowerCase().trim()).length > 0)
      return false;

    return true;
  }

}
