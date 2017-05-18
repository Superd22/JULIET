import { JulietShipsService } from './../../services/juliet-ships.service';
import { ShipModel } from './../../interfaces/ship-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.scss']
})
export class AdminTypesComponent implements OnInit {

  public shipTypes: ShipModel[] = [];
  public activeShip: ShipModel = { id: -1, type: "", ico: "", parent: 0, name: "" };
  constructor(private api: JulietShipsService) { }

  ngOnInit() {
    this.fetchTypes();
  }

  fetchTypes() {
    this.api.getAllShipTypes().subscribe((types) => this.shipTypes = types.sort((a, b) => a.name.localeCompare(b.name)));
  }

}
