import { AShipLabelComponent } from './../my-ships/a-ship-label/a-ship-label.component';
import { JulietHangarService } from './../../services/juliet-hangar.service';
import { JulietShipsService } from './../../services/juliet-ships.service';
import { AShip } from './../../interfaces/a-ship';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ju-ship-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleShipViewverComponent implements OnInit, OnChanges {


  @Input()
  public ship: AShip;
  @Input()
  private _shipID: number;
  @Input()
  public shipComponent: AShipLabelComponent;

  constructor(private api: JulietShipsService, public hangarAPI: JulietHangarService) { }

  ngOnInit() { }

  private initShip() {
    if (this.ship) this._shipID = this.ship.id;
    //else this.ship
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
