import { JulietCommonHelperService } from './../../../../juliet-common/services/juliet-common-helper.service';
import { ShipModel } from './../../../interfaces/ship-model';
import { Component, OnInit, OnChanges, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ju-hangar-admin-a-type',
  templateUrl: './a-type.component.html',
  styleUrls: ['./a-type.component.scss']
})
export class HangarAdminATypeComponent implements OnInit, OnChanges {

  @Input()
  public type: ShipModel;
  @Input()
  private active: HangarAdminATypeComponent;
  @Output()
  private activeChange: EventEmitter<HangarAdminATypeComponent> = new EventEmitter<HangarAdminATypeComponent>();


  private typeBackUp: ShipModel;

  constructor(private helper: JulietCommonHelperService) { }

  ngOnInit() {
    this.regenBackUp();
  }

  public get shipType(): ShipModel {
    return this.type;
  }

  public set shipType(ship: ShipModel) {
    this.type = ship;
    this.regenBackUp();
  }

  public makeThisActive() {
    this.active = this;
    this.activeChange.emit(this);
  }

  public get isDirty(): Boolean {
    return this.helper.hasChangedObj(this.typeBackUp, this.type, ["name", "ico", "type", "parent"]);
  }

  private isActive() {
    return this.active && this.active.type.id == this.type.id;
  }

  public restoreBackUp() {
    this.type = Object.assign({}, this.typeBackUp);

  }

  public regenBackUp() {
    this.typeBackUp = Object.assign({}, this.type);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('type' in changes) {
      this.regenBackUp();
    }
  }
}
