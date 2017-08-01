import { Observable } from 'rxjs/Observable';
import { ShipModel } from './../interfaces/ship-model';
import { AShipLabelComponent } from './../components/my-ships/a-ship-label/a-ship-label.component';
import { JulietShipsService } from './juliet-ships.service';
import { Injectable } from '@angular/core';

@Injectable()
export class JulietHangarService {

  constructor(private api: JulietShipsService) { }

  private _currentSingleShip: AShipLabelComponent = null;

  public get currentSingleShip(): AShipLabelComponent {
    return this._currentSingleShip;
  }

  public set currentSingleShip(ship: AShipLabelComponent) {
    this._currentSingleShip = ship;
  }

  public get currentSingleShipType(): Observable<ShipModel> {
    if (this._currentSingleShip == null || this._currentSingleShip.ship == null) return null;
    return this.api.getShipType(this._currentSingleShip.ship);
  }

}
