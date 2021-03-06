import { JulietHangarService } from './../../services/juliet-hangar.service';
import { SingleShipViewverComponent } from './../single/single.component';
import { AShip } from './../../interfaces/a-ship';
import { Transition } from '@uirouter/angular';
import { JulietUserService } from './../../../user/services/juliet-user.service';
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
  public hangar: Hangar;
  @Input("userId")
  protected _userId: number;
  @Input("user")
  public _user: AUser;
  public currentUser: AUser;
  public activeShip: AShip;

  constructor(protected api: JulietShipsService, private userAPI: JulietUserService, private trans: Transition, public hangarAPI: JulietHangarService) {
    this.handleUser();

    userAPI.currentUser.subscribe((currentUser) => {
      this.currentUser = currentUser;
      if (currentUser.id_forum == this._userId) {
        this._userId = 0;
      }
      if (this._userId == 0 || currentUser.id_forum == this._userId) this._user = currentUser;
    });


  }

  public setActiveShip(ship: AShip) {
    this.activeShip = ship;
  }

  ngOnInit() {
    if (this._userId != 0)
      this.userAPI.getUserFiche(this._userId).subscribe((targetUser) => {
        this._user = targetUser;
      });
    this.api.getAllShipTypes().subscribe((ships) => this.shipTypes = ships);
    // We use userId here to make sure we're always targeting who we want.
    this.api.getHangarOfPlayer(this._userId).subscribe((hangar) => this.hangar = hangar);
  }

  private handleUser() {
    if (this._user && this._user.id_forum) this._userId = this._user.id_forum;
    else if (!this._userId) this._userId = this.trans.params().user_id;
  }

}
