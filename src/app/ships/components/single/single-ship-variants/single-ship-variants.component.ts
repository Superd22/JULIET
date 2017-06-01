import { JulietShipsService } from './../../../services/juliet-ships.service';
import { AShip } from './../../../interfaces/a-ship';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'ju-single-ship-variants',
  templateUrl: './single-ship-variants.component.html',
  styleUrls: ['./single-ship-variants.component.scss']
})
export class SingleShipVariantsComponent implements OnInit, OnChanges {

  @Input("ship")
  private _ship: AShip;
  @Input("shipId")
  private _shipId: number;

  public ship: AShip;

  constructor(protected api: JulietShipsService) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }


  private init() {
    if (this._ship != null) this._shipId = this._ship.id;
    if (this._shipId > 0) {
      this.api.getShip(this._shipId).subscribe(
        (ship) => this.ship = ship
      )
    }
  }
}
