import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { JulietShipsService } from './../../services/juliet-ships.service';
import { ShipModel } from './../../interfaces/ship-model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.scss']
})
export class AdminTypesComponent implements OnInit, OnDestroy {

  public shipTypes: ShipModel[] = [];
  public activeShip: ShipModel = { id: -1, type: "", ico: "", parent: 0, name: "" };
  constructor(private api: JulietShipsService, private mScrollbarService:MalihuScrollbarService) { }

  ngOnInit() {
    this.fetchTypes();
    this.handleScrollBar(true);
  }

  ngOnDestroy() {
    this.handleScrollBar(false);
  }

  /**
   * Register or de-register the custom scroll-bar for the types of ships
   * @param adding if we're adding the scroll bar or not (false for un-register)
   */
  private handleScrollBar(adding: boolean): void {
    if(adding) 
      this.mScrollbarService.initScrollbar('.ships-wraper', { axis: 'y', theme: 'dark-thick', scrollInertia: 0, scrollButtons: { enable: true } });
    else this.mScrollbarService.destroy('.ships-wraper');
  }

  fetchTypes() {
    this.api.getAllShipTypes().subscribe((types) => this.shipTypes = types.sort((a, b) => a.name.localeCompare(b.name)));
  }

}
