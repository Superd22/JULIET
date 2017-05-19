import { JulietRightsService } from './../../../juliet-common/services/juliet-rights.service';
import { TagListComponent } from './../../../tags/components/_common/tag-list/tag-list.component';
import { Subscription } from 'rxjs/Subscription';
import { ATag } from './../../../tags/interfaces/a-tag';
import { TagsService } from './../../../tags/services/tags.service';
import { AShipLabelComponent } from './../my-ships/a-ship-label/a-ship-label.component';
import { JulietHangarService } from './../../services/juliet-hangar.service';
import { JulietShipsService } from './../../services/juliet-ships.service';
import { AShip } from './../../interfaces/a-ship';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ju-ship-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleShipViewverComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public ship: AShip;
  @Input()
  private _shipID: number;
  @Input()
  public shipComponent: AShipLabelComponent;
  public currentUserCan = false;

  constructor(private api: JulietShipsService, public hangarAPI: JulietHangarService, public tagsAPI: TagsService, public rights: JulietRightsService) { }

  ngOnInit() {
    console.log("TEST");
  }


  ngAfterViewInit(): void {
  }

  private initShip() {
    if (this.ship) this._shipID = this.ship.id;

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
