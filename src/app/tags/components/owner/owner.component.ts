import { AShipTemplate } from './../../../ships/interfaces/a-template';
import { ReplaySubject } from 'rxjs/ReplaySubject';
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
  @Input()
  protected shipTemplate: AShipTemplate = null;

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

  private _fetchedFor: { type: "user" | "ship" | "shipModel" | "shipTemplate", target: number } = { type: null, target: null };

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
      case "shipTemplate": this.doForShipTemplate(); break;
    }

    this.api.onTagTaken.subscribe((taken) => {
      let tag = Object.assign({},taken.tag);
      if (this.tagXEventIsUs(taken) || this.tagXEventIsOurFather(taken)) {
        if(!this.tagXEventIsUs(taken)) {
          tag.herited_from = {id: taken.target_id, target_type: taken.target_type}
        }

        this.addTagToArray(tag);
      }
    });

    this.api.onTagUnTaken.subscribe((taken) => {
      if (this.tagXEventIsUs(taken) || this.tagXEventIsOurFather(taken)) {
        this.removeTagFromArray(taken.tag);
      }
    });

  }

  private tagXEventIsUs(taken) {
    return taken.target_id == this._fetchedFor.target && taken.target_type == this._fetchedFor.type;
  }

  private tagXEventIsOurFather(taken) {
    switch(this.getCurrentTargetType()) {
      case "user": return false;
      case "ship": return taken.target_id == this.ship.type_id && taken.target_type == "shipModel";
      case "shipModel": return taken.target_id == this.shipModel.parent && taken.target_type == "shipModel";
      case "shipTemplate": return ( (taken.target_id == this.shipTemplate.ship_id && taken.target_type == "ship") || 
                                    (taken.target_id == this.shipTemplate.ship_type_id && taken.target_type == "shipModel") );
    }
  }

  /**
   * Returns the current target types
   * @return user | ship | shipModel
   * @throws error on multiple targets
   */
  protected getCurrentTargetType(): "user" | "ship" | "shipModel" | "shipTemplate" {
    if (this._userId != null && this.ship == null && this.shipModel == null && this.shipTemplate == null) return "user";
    else if (this._userId == null && this.ship != null && this.shipModel == null && this.shipTemplate == null) return "ship";
    else if (this._userId == null && this.ship == null && this.shipModel != null && this.shipTemplate == null) return "shipModel";
    else if (this._userId == null && this.ship == null && this.shipModel == null && this.shipTemplate != null) return "shipTemplate";
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
        data => this.currentUserCan = data
      );

      this._fetchedFor = { type: "user", target: this._userId };
    }
  }

  protected doForShipTemplate() {
    if (this._fetchedFor.type != "shipTemplate" || this.shipTemplate.id != this._fetchedFor.target) {
      this.fetchTagList();

      /** @todo handle ship template of model */
      this.rights.user_can("USER_CAN_EDIT_SHIP_TAGS", 0, this.shipTemplate.ship_id).subscribe(
        data => this.currentUserCan = data
      );

      this._fetchedFor = { type: "shipTemplate", target: this.shipTemplate.id };
    }
  }

  protected doForShip() {
    if (this._fetchedFor.type != "ship" || this.ship.id != this._fetchedFor.target) {
      this.fetchTagList();

      this.rights.user_can("USER_CAN_EDIT_SHIP_TAGS", 0, this.ship.id).subscribe(
        data => this.currentUserCan = data
      );

      this._fetchedFor = { type: "ship", target: this.ship.id };
    }
  }

  protected doForShipModel() {
    if (this._fetchedFor.type != "shipModel" || this.shipModel.id != this._fetchedFor.target) {
      this.fetchTagList();

      this.rights.user_can("USER_CAN_ADMIN_SHIPS").subscribe(
        data => this.currentUserCan = data
      );

      this._fetchedFor = { type: "shipModel", target: this.ship.id };
    }
  }

  /**
   * Fetches the list of tags the current target has
   * will update tagList on each call.
   */
  protected fetchTagList() {
    let call = this.getTagsFromCache();
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

  private getTagsFromCache(): ReplaySubject<ATag[]> {
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
      case "shipTemplate":
        call = this.api.getShipTemplateTags(this.shipTemplate);
        break;
    }

    return call;
  }

  /* Triggered when a given tag is taken by the user. */
  public tagTaken(tag: ATag) {
    if (tag == null) return false;
    this.busy = true;
    this.affectTag(tag).subscribe(
      (data) => {
        this.addTagToArray(tag);
        this.resetFilterName();
      }
    );
  }

  public tagUnTaken(tag: ATag) {
    this.busy = true;
    this.unAffectTag(tag).subscribe((data) => {
      this.removeTagFromArray(tag);
      this.resetFilterName();
    });
  }

  /**
   * Add the given tag to our current tags array and broadcast that change
   * @param tag the tag to add
   */
  private addTagToArray(tag: ATag) {
    if(this.tagsList.findIndex( (test) => test.id == tag.id && test.cat == tag.cat ) == -1) {
      this.tagsList.push(tag);
      this.propagateCurrentTagList();
    }
  }

  /**
   * Remove the given tag from our current tags array and broadcast that change
   * @param tag the tag to remove
   */
  private removeTagFromArray(tag: ATag) {
    let id = this.tagsList.findIndex(cur => cur.id === tag.id);
    if(id > -1) {
      this.tagsList.splice(id, 1);
      this.propagateCurrentTagList();
    }
  }

  /**
   * Propagates our current tag list to the service so that every other components 
   * gets updated
   */
  private propagateCurrentTagList() {
    this.getTagsFromCache().next(this.tagsList);
    this.busy = false;
  }

  private affectTag(tag: ATag) {
    switch (this.getCurrentTargetType()) {
      case "user": return this.api.assignTag(tag, this._userId);
      case "ship": return this.api.assignTagShip(tag, this.ship);
      case "shipModel": return this.api.assignTagShipModel(tag, this.shipModel);
      case "shipTemplate": return this.api.assignTagShipTemplate(tag, this.shipTemplate);
    }
  }

  private unAffectTag(tag: ATag) {
    switch (this.getCurrentTargetType()) {
      case "user": return this.api.unAssignTag(tag, this._userId);
      case "ship": return this.api.unAssignTagShip(tag, this.ship);
      case "shipModel": return this.api.unAssignTagShipModel(tag, this.shipModel);
      case "shipTemplate": return this.api.unAssignTagShipTemplate(tag, this.shipTemplate);
    }
  }

  protected addTag() {
    this.busy = true;
    this.api.createTag(this.tagList.filter.name).subscribe(
      tag => {
        this.affectTag(tag).subscribe(
          (data) => {
            this.tagsList.push(tag);
            this.propagateCurrentTagList();
          }
        );
        this.resetFilterName();
      }
    );
  }

  /**
   * Resets the filter input 
   */
  private resetFilterName() {
    this.tagList.filter.name = "";
  }

  public shouldAddTag() {
    if (this.tagList.searchHasExactMatch() || !(this.tagList.filter.name)) return false;

    let filtered = this.filteredTags.original;
    if (filtered && filtered.filter(tag => tag.name.toLowerCase() === this.tagList.filter.name.toLowerCase().trim()).length > 0)
      return false;

    return true;
  }

}
