import { Observable } from 'rxjs/Observable';
import { AUser } from './../../../user/interfaces/a-user';
import { JulietShipsService } from './../../services/juliet-ships.service';
import { AShip } from './../../interfaces/a-ship';
import { ShipModel } from './../../interfaces/ship-model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Hangar } from './../../interfaces/hangar';
import { FormControl } from "@angular/forms";
import { MdAutocompleteTrigger, MdAutocomplete } from "@angular/material";

@Component({
  selector: 'ju-my-ships',
  templateUrl: './my-ships.component.html',
  styleUrls: ['./my-ships.component.scss']
})
export class MyShipsComponent implements OnInit {

  @Input()
  private hangar: Hangar = null;
  @Input("userid")
  private _userId: number = 0;
  private shipTypes: ShipModel[] = null;
  private filteredType: Observable<ShipModel[]> = null;
  private typeCtrl: FormControl;
  private busy: boolean = false;

  constructor(private api: JulietShipsService) {
    this.typeCtrl = new FormControl();
    this.filteredType = this.typeCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterTypes(name));
  }

  private filterTypes(name: string): ShipModel[] {
    let r = name ? this.shipTypes.filter(s => new RegExp(`${name}`, 'gi').test(s.name))
      : this.shipTypes;

    console.log(r);
    return r;
  }

  displayType(type: ShipModel): string {
    return type ? type.name : "";
  }

  /**
   * Called to add a ship to this hangar
   * @param shipToAdd 
   */
  public addShip(shipToAdd: ShipModel) {
    if (!this.busy) {
      this.busy = true;
      this.api.createNewShip(shipToAdd, this._userId).subscribe((newShip) => {
        this.hangar.ships.push(newShip);
        this.busy = false;
        this.typeCtrl.setValue("");
      });
    }
  }

  public deleteShip(shipToDelete: AShip) {
    if (!this.busy) {
      this.busy = true;
      this.api.deleteShip(shipToDelete).subscribe(() => {
        this.busy = false;
        this.hangar.ships.splice(this.hangar.ships.findIndex((ship) => ship.id == shipToDelete.id), 1);
      });
    }
  }

  /**
   * Populate this ship lists, either with the input or fetching on its own
   */
  private populateHangar() {
    if (this.hangar === null) this.fetchHangarData();
    this.api.getAllShipTypes().subscribe(map => this.shipTypes = map.sort((a, b) => a.name.localeCompare(b.name)));
  }

  private fetchHangarData() {
    this.api.getHangarOfPlayer(this._userId).subscribe((hangar) => this.hangar = hangar);
  }

  ngOnInit() {
    this.populateHangar();
  }


}
