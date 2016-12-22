import { TagsService } from './../../services/tags.service';
import { ATag } from './../../interfaces/a-tag';
import { Component, OnInit, Input } from '@angular/core';
import { TagsType } from './../../enums/tags-type.enum';
import { CompleterService, CompleterData, CompleterItem, RemoteData } from "ng2-completer";
import {StateService} from "ui-router-ng2";
@Component({
  selector: 'tag-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  @Input()
  public _tagName:String;
  @Input()
  public _tagCat:String;
  public tagTypes = TagsType;

  private tagsList;

  constructor(private Tags:TagsService, public state:StateService) { 
    console.log(this);
    this.tagsList = Tags.buildCompleter();
    console.log(state);
   }

   public setParent($event) {
     let parent = $event.originalObject.id;
     this.Tags.selectedTag.parent = parent;
   }

  ngOnInit() {
    this.Tags.getTag(this._tagName, this._tagCat);
  }

}
