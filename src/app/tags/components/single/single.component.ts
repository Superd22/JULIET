import { Observable } from 'rxjs/Observable';
import { tags } from './../../states/tags.state';
import { TagsService } from './../../services/tags.service';
import { ATag } from './../../interfaces/a-tag';
import { Component, OnInit, Input } from '@angular/core';
import { TagsType } from './../../enums/tags-type.enum';
import { CompleterService, CompleterData, CompleterItem, RemoteData } from "ng2-completer";
import { StateService } from "ui-router-ng2";

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

  private tagTypes = TagsType;
  private dialogRef;

  constructor(private Tags: TagsService) {
    this.tagsList0 = Tags.buildCompleter();
    this.tagsList1 = Tags.buildCompleter();
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
    return cat != "tag" ? cat : type == 0 ? "" : this.tagTypes[type];
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
    this.Tags.selectedTag.parent = parent;
    console.log($event);
  }

  public setRights($event) {
    let right = $event.originalObject.id;
    this.Tags.selectedTag.rights_from = right;
  }

  public assignTagToSelf() {
    this.Tags.assignTag(this.tagBackup);
  }

  public deleteTag() {
    if(confirm("Êtes vous sur de vouloir supprimer ce T.A.G ?")) {
      this.doDelete();
    }
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
        }
      );
  }

}