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
    parentSelect: String,
    rightsFromSelect: String,
  } = { parentSelect: null, rightsFromSelect: null };

  public shouldTransf: ATag = null;

  private tagsList0;
  private tagsList1;
  private userList;

  private tagTypes = TagsType;
  private dialogRef;

  private addingUser:String;

  private hasR:Boolean = false;

  constructor(private Tags: TagsService, private rights:JulietRightsService, private helper: JulietCommonHelperService) {
    this.tagsList0 = Tags.buildCompleter();
    this.tagsList1 = Tags.buildCompleter();
    this.userList = helper.buildCompleter("username", `Common/UserSearch/?f=`);
    // this.apiNamespace + `tags_searchphp?f=${term}`
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
    
    if(cat != "tag") return cat;
    if(type == 0) return "";
    if(this.tagTypes[type]) return this.tagTypes[type];

    return type;
  }

  public doMigrate() {
    this.Tags.migrateTag(this.tagBackup, this.shouldTransf);
  }

  public doDelete() {
    this.Tags.deleteTag(this.tagBackup);
  }

  public updateTag() {
    this.Tags.updateTag(this.tag);
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
    this.Tags.assignTag(this.tagBackup);
  }

  public addUser($event) {
    this.Tags.assignTag(this.tag, Number($event.originalObject.user_id)).subscribe();
  }

  public removeUser(userId:Number, $event) {
    this.Tags.unAssignTag(this.tag, Number(userId)).subscribe();
    if($event) $event.stopPropagation();
  }

  public deleteTag() {
    if(confirm("Êtes vous sur de vouloir supprimer ce T.A.G ?")) {
      this.doDelete();
    }
  }

  public isEditable(doNotcheckR?:Boolean) {
    let test = this.tag && this.tag.cat == "tag";

    if(doNotcheckR) return test;
    return test && this.hasR;
  }

  public hasTagChanged() {
    return this.helper.hasChangedObj(this.tag, this.tagBackup, ["name", "img","restricted","type","cat","parent","rights_from"]);
  }

  ngOnInit() {
    if (this._tag) this.tag = this._tag;
    else
      this.Tags.getTag(this._tagName, this._tagCat).subscribe(
        data => {
          this.tag = data;
          this.tagBackup = Object.assign({}, data);

          this.Tags.getTagNameById(data.parent).subscribe(
            data => data ? this.tagInfo.parentSelect = data : null
          );

          this.Tags.getTagNameById(data.rights_from).subscribe(
            data => data ? this.tagInfo.rightsFromSelect = data : null
          );

          // Get rights
          if(this.isEditable(true)) this.rights.user_can("USER_CAN_ADMIN_TAG", 0, this.tag.id).subscribe(
            data => this.hasR = data.data
          );
        }
      );
  }

}