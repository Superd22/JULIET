import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { ShipModel } from './../interfaces/ship-model';
import { AShipLabelComponent } from './../components/my-ships/a-ship-label/a-ship-label.component';
import { JulietShipsService } from './juliet-ships.service';
import { Injectable } from '@angular/core';

@Injectable()
export class JulietHangarService {

  constructor(private api: JulietShipsService) { }

  private _currentSingleShip: BehaviorSubject<AShipLabelComponent> = new BehaviorSubject(null);

  public get currentSingleShip(): AShipLabelComponent {
    return this._currentSingleShip.getValue();
  }

  public set currentSingleShip(ship: AShipLabelComponent) {
    this._currentSingleShip.next(ship);
  }

  public get currentSingleShipType(): Observable<ShipModel> {
    if (this.currentSingleShip == null || this.currentSingleShip.ship == null) return null;
    return this.api.getShipType(this.currentSingleShip.ship);
  }

}
