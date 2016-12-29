import { ATag } from './../../../interfaces/a-tag';
import { TagsModule } from './../../../tags.module';
import { Component, OnInit, Input } from '@angular/core';
import { TagsType } from './../../../enums/tags-type.enum'
@Component({
  selector: 'a-tag',
  templateUrl: './a-tag.component.html',
  styleUrls: ['./a-tag.component.scss']
})
export class ATagComponent implements OnInit {

  @Input()
  public tag:ATag;

  public tagType = TagsType;

  constructor() { 
  }

  ngOnInit() {
    if(this.tag.restricted) this.tag.restricted = Number(this.tag.restricted);
  }

  protected isRestricted() {
    return this.tag.restricted == 1 || this.tag.cat != 'tag'
  }

}
