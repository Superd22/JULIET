import { BaseUserInfo } from './../../../user/interfaces/base-user-info';
import { FormControl } from '@angular/forms';
import { JulietUserService } from './../../../user/services/juliet-user.service';
import { JulietCommonHelperService } from './../../../juliet-common/services/juliet-common-helper.service';
import { JulietRightsService } from './../../../juliet-common/services/juliet-rights.service';
import { Observable } from 'rxjs/Observable';
import { tags } from './../../states/tags.state';
import { TagsService } from './../../services/tags.service';
import { ATag } from './../../interfaces/a-tag';
import { Component, OnInit, Input } from '@angular/core';
import { TagsType } from './../../enums/tags-type.enum';
import { CompleterService, CompleterData, CompleterItem, RemoteData } from "ng2-completer";
import { StateService } from "@uirouter/angular";
import { TagTarget } from '../../interfaces/tag-target';

@Component({
  selector: 'tag-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  @Input()
  public _tagName: String;
  @Input()
  public _tagCat: String;
  @Input()
  public _tag: ATag;

  public tag: ATag;
  public tagBackup: ATag;
  public tagInfo: {
    parentSelect: string,
    rightsFromSelect: string,
  } = { parentSelect: null, rightsFromSelect: null };

  /** holds a matching tag for a change of name */
  public shouldTransf: ATag = null;
  /** if we're loading something */
  public busy: boolean = false;

  private tagsList0;
  private tagsList1;

  /** form controller for the user search */
  private userCtrl: FormControl;
  /** current feteched users for the search */
  protected fetchedUsers: Observable<BaseUserInfo[]> = null;
  /** the current input for adding user */
  protected userAdd: string;

  private tagTypes = TagsType;
  private dialogRef;

  /** if current user has admin rights on this tag */
  private hasR: boolean = false;
  /** wether or not we already fetched our current rights */
  private fetchedRights: boolean = false;

  constructor(private Tags: TagsService, private rights: JulietRightsService, private helper: JulietCommonHelperService, public state: StateService,
    protected userAPI: JulietUserService) {
    this.tagsList0 = Tags.buildCompleter();
    this.tagsList1 = Tags.buildCompleter();

    this.generateUserCtrl();
  }

  private generateUserCtrl() {
    this.userCtrl = new FormControl();
    this.fetchedUsers = this.userCtrl.valueChanges
      .startWith(null)
      .switchMap(name => this.userAPI.searchUserByName(name));
  }

  public nameChanged(newName) {
    if (newName != this.tagBackup.name)
      this.Tags.getTag(newName, this._tagCat).subscribe(
        data => this.shouldTransf = data ? data : null
      );
  }

  public displayTagType() {
    let type = this.tag.type;
    let cat = this.tag.cat;

    if (cat != "tag") return cat;
    if (type == 0) return "";
    if (this.tagTypes[type]) return this.tagTypes[type];

    return type;
  }

  public isBusy() {
    return this.busy;
  }

  public doMigrate() {
    this.Tags.migrateTag(this.tagBackup, this.shouldTransf);
  }

  public doDelete() {
    this.Tags.deleteTag(this.tagBackup);
  }

  public updateTag() {
    this.busy = true;
    this.Tags.updateTag(this.tag).subscribe(() => {
      this.busy = false;
      this.generateBackUp();
    });
  }

  public setParent($event) {
    let parent = $event.originalObject.id;
    this.tag.parent = parent;
  }

  public setRights($event) {
    let right = $event.originalObject.id;
    this.tag.rights_from = right;
  }

  public assignTagToSelf() {
    this.busy = true;
    this.Tags.assignTag(this.tagBackup).subscribe(() => {
        this.fetchTagData(true);
        this.busy = false;
    });
  }

  public addUser($event) {
    this.busy = true;
    this.Tags.assignTag(this.tag, Number($event.user_id)).subscribe(
      () => {
        this.fetchTagData(true);
        this.userAdd = "";
        this.busy = false;
      }
    );
  }

  public removeUser(userId: Number, $event) {
    this.busy = true;
    this.Tags.unAssignTag(this.tag, Number(userId)).subscribe(() => {
        this.fetchTagData(true);
        this.busy = false;
    });
    if ($event) $event.stopPropagation();
  }

  public deleteTag() {
    if (confirm("Êtes vous sur de vouloir supprimer ce T.A.G ?")) {
      this.doDelete();
    }
  }

  public isEditable(doNotcheckR?: Boolean) {
    let test = this.tag && this.tag.cat == "tag";

    if (doNotcheckR) return test;
    return test && this.hasR;
  }

  public hasTagChanged() {
    return this.helper.hasChangedObj(this.tag, this.tagBackup, ["name", "img", "restricted", "type", "cat", "parent", "rights_from"]);
  }

  protected generateBackUp() {
    this.tagBackup = Object.assign({}, this.tag);
  }

  /**
   * Fetch the data for this single tag
   * @param force_tag force the updating of the tag if we already have one cached.
   * @param force_right force the updating of the rights if we already have some cached.
   */
  private fetchTagData(force_tag?: boolean, force_right?: boolean) {
    if(this.tag == null || force_tag)
    this.Tags.getTag(this._tagName, this._tagCat).subscribe(
      data => {
        this.tag = data;

        this.generateBackUp();
        this.Tags.getTagNameById(data.parent).subscribe(
          data => data ? this.tagInfo.parentSelect = data : null
        );

        this.Tags.getTagNameById(data.rights_from).subscribe(
          data => data ? this.tagInfo.rightsFromSelect = data : null
        );

        // Get rights
        if (this.isEditable(true) && (!this.fetchedRights || force_right)) this.rights.user_can("USER_CAN_ADMIN_TAG", 0, this.tag.id).subscribe(
          data => {
            this.hasR = data.data;
            this.fetchedRights = true;
          }
        );
      }
    );
  }

  ngOnInit() {
    if (this._tag) this.tag = this._tag;
    else this.fetchTagData();
  }

}