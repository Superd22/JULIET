import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StateService } from '@uirouter/angular';
import { JulietShipsService } from './../../services/juliet-ships.service';
import { ShipModel } from './../../interfaces/ship-model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.scss']
})
export class AdminTypesComponent implements OnInit, OnDestroy {

  public shipTypes: ShipModel[] = [];
  public activeShip: ShipModel = { id: -1, type: "", ico: "", parent: 0, name: "" };
  @Input()
  private _auth: BehaviorSubject<boolean>;
  constructor(private api: JulietShipsService, private state: StateService) {

  }

  ngOnInit() {
    this.ensureAuthorize();
    this.fetchTypes();
  }

  ngOnDestroy() {
  }

  private ensureAuthorize() {
    if (this._auth.getValue()) return;
    else {
      this.state.go("secure.error.unauthorized", { required: "USER_IS_ADMIN" });
    }
  }

  /**
   * Register or de-register the custom scroll-bar for the types of ships
   * @param adding if we're adding the scroll bar or not (false for un-register)
   */
  private handleScrollBar(adding: boolean): void {

  }

  fetchTypes() {
    this.api.getAllShipTypes().subscribe((types) => this.shipTypes = types.sort((a, b) => a.name.localeCompare(b.name)));
  }

}
