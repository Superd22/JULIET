import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JulietCommonHelperService } from './../../../../juliet-common/services/juliet-common-helper.service';
import { AGroup } from './../../../interfaces/a-group';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { IJuGroupAffectation } from "../../../interfaces/IJuGroupAffectation";

@Component({
  selector: 'ju-group-affected-list',
  templateUrl: './affected-list.component.html',
  styleUrls: ['./affected-list.component.scss']
})
export class JuGroupAffectedListComponent implements OnInit {

  @Input()
  public group: AGroup;

  public _filters = {
    users: true,
    ships: true,
    ressources: true,
  }
  public get filters() { return this.filterChanged.getValue(); }
  public set filters(filters) { this._filters = filters; this.filterChanged.next(filters); }
  public filterChanged = new BehaviorSubject(this._filters);

  public displayData;
  constructor() { }

  ngOnInit() {
    this.displayData = JulietCommonHelperService.buildDataSourceFrom(this.displayObservable());
  }

  public toggleFilter(filter: string) {
    this.filters[filter] = !this.filters[filter];
    this.filters = this.filters;
  }

  public iconForFilter(filter: string) {
    return this.filters[filter] ? "check_box" : "check_box_outline_blank";
  }

  public displayObservable(): Observable<IJuGroupAffectation[]> {
    console.log(this);
    const displayDataChanges = [
      this.filterChanged
    ]

    return Observable.merge(...displayDataChanges).map(() => {
      // will contain the objects we want to display
      let wantedObjects: IJuGroupAffectation[] = [];

      // For every filter
      Object.keys(this.filters).forEach((filter) => {

        // Add every type of ressources we want
        if (this.filters && this.filters[filter] && this.group) {
          console.log(this.group, this.group.affectations);
          if(this.group.affectations) {
            wantedObjects = wantedObjects.concat(this.group.affectations[filter]);
          }
        }

      });


      return wantedObjects;
    });
  }

  /**
   * Returns the display name of a given affectation
   * @param row the row to get displayname for
   * @return string the displayname
   */
  public getAffectationDisplayName(row: IJuGroupAffectation): string {

    if (row.type == "user") return row.username;
    if (row.type == "ship") return row.name;
    else return "";

  }

  public getIdOfRow(row: IJuGroupAffectation): string {
    return "row-"+row.type + row.id;
  }

}
