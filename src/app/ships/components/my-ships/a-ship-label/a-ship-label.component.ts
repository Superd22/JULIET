import { ShipModel } from './../../../interfaces/ship-model';
import { JulietShipsService } from './../../../services/juliet-ships.service';
import { AShip } from './../../../interfaces/a-ship';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ju-a-ship-label',
  templateUrl: './a-ship-label.component.html',
  styleUrls: ['./a-ship-label.component.scss']
})
export class AShipLabelComponent implements OnInit {

  @Input()
  private ship: AShip = null;
  private shipType: ShipModel = null;
  @Output("onDelete")
  private _deleteEmitter: EventEmitter<AShip> = new EventEmitter();
  constructor(private api: JulietShipsService) { }

  ngOnInit() {
    if (this.ship != null) this.api.getShipType(this.ship).subscribe((model) => this.shipType = model);
  }

  public deleteShip() {
    this._deleteEmitter.emit(this.ship);
  }

}
