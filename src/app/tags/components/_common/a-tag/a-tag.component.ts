import { Observable } from 'rxjs/Observable';
import { JulietShipsService } from './../../../../ships/services/juliet-ships.service';
import { ATag } from './../../../interfaces/a-tag';
import { TagsModule } from './../../../tags.module';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagsType } from './../../../enums/tags-type.enum'
import { TagsService } from '../../../services/tags.service';

@Component({
  selector: 'a-tag',
  templateUrl: './a-tag.component.html',
  styleUrls: ['./a-tag.component.scss']
})

export class ATagComponent implements OnInit {

  @Input()
  /* The main TAG object */
  public tag: ATag;

  @Input()
  /* The tag is in a non-user specific list  */
  protected mainList: Boolean = true;

  @Input()
  /* the current user can edit (take/untake/remove) this tag */
  protected editable: Boolean = false;

  @Input()
  /* the current user has this tag. ONLY USED if mainlist is false. */
  protected userHas: Boolean = false;

  @Output("take")
  /* When the user wanna take a tag */
  protected takeChange = new EventEmitter();

  @Output("unTake")
  /* When the user wanna remove a tag */
  protected unTakeChange = new EventEmitter();

  /* Enum of TagsTypes */
  public tagType = TagsType;

  constructor(protected shipAPI: JulietShipsService) {
  }

  ngOnInit() {
    if (this.tag.restricted) this.tag.restricted = Number(this.tag.restricted);
  }

  protected isRestricted() {
    return this.tag.restricted == 1 || this.tag.cat != 'tag'
  }

  protected shouldDisplayParent() {
    return this.tag.herited_from != null;
  }

  protected shouldDisplayUnTake() {
    return !this.isRestricted() && !this.mainList && this.editable && this.userHas && !this.shouldDisplayParent();
  }

  protected shouldDisplayTake() {
    return !this.isRestricted() && !this.mainList && this.editable && !this.userHas && !this.shouldDisplayParent();
  }

  protected heritedTarget(): Observable<string> {
    if (this.tag.herited_from == null) return Observable.of("");

    if (this.tag.herited_from.target_type == "shipModel") {
      return this.shipAPI.getAllShipTypesMap().map((map) => {
        return map.get(this.tag.herited_from.id).name;
      });
    }

  }

  /**
   * Triggered on click on linked icon
   * Will change state to the target we got this tag from
   */
  protected heritedFrom(event) {
    event.stopPropagation();
  }

  /**
   * Triggered when we want to take this tag
   * will emit the event
   */
  protected takeTag(event) {
    this.takeChange.emit(this.tag);
    event.stopPropagation();
  }

  /**
   * Triggered when we want to un take this tag
   * will emit the event
   */
  protected unTakeTag(event) {
    this.unTakeChange.emit(this.tag);
    event.stopPropagation();
  }


}
