import { JulietShipsService } from './../../services/juliet-ships.service';
import { ShipModel } from './../../interfaces/ship-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.scss']
})
export class AdminTypesComponent implements OnInit {

  private shipTypes: ShipModel[] = [];
  private activeShip: ShipModel = { id: -1, type: "", ico: "", parent: 0, name: "" };
  constructor(private api: JulietShipsService) { }

  ngOnInit() {
    this.fetchTypes();
  }

  private resetActiveShip() {
    this.activeShip = {
      name: "",
      id: 0,
      ico: "",
      parent: 0,
      type: "",
    };
  }

  private fetchTypes() {
    this.api.getAllShipTypes().subscribe((types) => this.shipTypes = types.sort((a, b) => a.name.localeCompare(b.name)));
  }

}
