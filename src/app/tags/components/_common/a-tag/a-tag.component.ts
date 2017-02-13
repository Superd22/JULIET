import { ATag } from './../../../interfaces/a-tag';
import { TagsModule } from './../../../tags.module';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagsType } from './../../../enums/tags-type.enum'

@Component({
  selector: 'a-tag',
  templateUrl: './a-tag.component.html',
  styleUrls: ['./a-tag.component.scss']
})

export class ATagComponent implements OnInit {

  @Input()
  /* The main TAG object */
  public tag:ATag;

  @Input()
  /* The tag is in a non-user specific list  */
  protected mainList:Boolean = true;

  @Input()
  /* the current user can edit (take/untake/remove) this tag */
  protected editable:Boolean = false;

  @Input() 
  /* the current user has this tag. ONLY USED if mainlist is false. */
  protected userHas:Boolean = false;

  @Output("take") 
  /* When the user wanna take a tag */
  protected takeChange = new EventEmitter();

  @Output("unTake") 
  /* When the user wanna remove a tag */
  protected unTakeChange = new EventEmitter();

  /* Enum of TagsTypes */
  public tagType = TagsType;

  constructor() { 
  }

  ngOnInit() {
    if(this.tag.restricted) this.tag.restricted = Number(this.tag.restricted);
  }

  protected isRestricted() {
    return this.tag.restricted == 1 || this.tag.cat != 'tag'
  }

  protected shouldDisplayUnTake() {
    return !this.isRestricted() && !this.mainList && this.editable && this.userHas;
  }

  protected shouldDisplayTake() {
    return !this.isRestricted() && !this.mainList && this.editable && !this.userHas;
  }

  protected takeTag(event) {
    this.takeChange.emit(this.tag);
    event.stopPropagation();
  }

  protected unTakeTag(event) {
    this.unTakeChange.emit(this.tag);
    event.stopPropagation();
  }


}
