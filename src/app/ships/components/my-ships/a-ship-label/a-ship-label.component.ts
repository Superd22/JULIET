import { FormControl } from '@angular/forms';
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
  public ship: AShip = null;
  private shipBack: AShip = null;
  private shipType: ShipModel = null;
  @Output("onDelete")
  private _deleteEmitter: EventEmitter<AShip> = new EventEmitter();
  private busy: boolean = false;

  private nameCtrl: FormControl;

  constructor(private api: JulietShipsService) { }


  ngOnInit() {
    if (this.ship != null) {
      this.api.getShipType(this.ship).subscribe((model) => this.shipType = model);
      this.genBackUp()
    }

  }

  private genBackUp() {
      this.shipBack = Object.assign({}, this.ship);
  }

  public isUnsaved() {
    return this.shipBack.name != this.ship.name;
  }

  public deleteShip() {
    this._deleteEmitter.emit(this.ship);
  }

  public changeName() {
    if (!this.busy) {
      this.busy = true;
      this.api.updateShip(this.ship).subscribe( () => {
        this.busy = false;
        this.genBackUp();
      });
    }
  }

}
