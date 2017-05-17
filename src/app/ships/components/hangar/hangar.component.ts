import { AUser } from './../../../user/interfaces/a-user';
import { Hangar } from './../../interfaces/hangar';
import { ShipModel } from './../../interfaces/ship-model';
import { JulietShipsService } from './../../services/juliet-ships.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hangar',
  templateUrl: './hangar.component.html',
  styleUrls: ['./hangar.component.scss']
})
export class HangarComponent implements OnInit {

  /** the existing ship types */
  protected shipTypes: ShipModel[];
  /** our main holder */
  protected hangar: Hangar;
  @Input("userId")
  protected _userId: number = 0;
  @Input("user")
  protected _user: AUser;

  constructor(protected api: JulietShipsService) { }

  ngOnInit() {
    this.handleUser();

    this.api.getAllShipTypes().subscribe((ships) => this.shipTypes = ships);
    // We use userId here to make sure we're always targeting who we want.
    this.api.getHangarOfPlayer(this._userId).subscribe( (hangar) => this.hangar = hangar );
  }

  private handleUser() {
    if(this._user && this._user.id_forum) this._userId = this._user.id_forum;
  }

}
