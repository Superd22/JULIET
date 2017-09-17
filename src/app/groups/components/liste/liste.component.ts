import { Observable } from 'rxjs/Observable';
import { AGroup } from './../../interfaces/a-group';
import { JulietCommonHelperService } from './../../../juliet-common/services/juliet-common-helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JulietGroupsService } from '../../services/juliet-groups.service';
import { DataSource } from '@angular/cdk/table';
import { MdPaginator, MdSort } from "@angular/material";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  public busy = false;
  public dataGroups: DataSource<AGroup>;
  public displayedColumns = ['nom', 'members'];

  @ViewChild(MdSort) private _sort: MdSort;
  @ViewChild(MdPaginator) private _paginator: MdPaginator;

  constructor(public groupApi: JulietGroupsService) { }

  ngOnInit() {
    this.busy = true;
    this.dataGroups = JulietCommonHelperService.buildDataSourceFrom(this.filterDataGroup());
    this.groupApi.listGroups().subscribe(
      data => {
        this.busy = false
      }
    )
  }

  public filterDataGroup(): Observable<AGroup[]> {

    const displayChange = [
      this.groupApi.groupList,
      this._paginator.page,
      this._sort.mdSortChange,
    ];

    return Observable.merge(...displayChange).map(() => {
      // Copy data.
      let data = this.groupApi.groupList.getValue().slice();

      // Sort data
      data = this.sortDataGroup(data);

      const start = this._paginator.pageIndex * this._paginator.pageSize;
      let splice = data.splice(start, this._paginator.pageSize);

      return splice;
    });

  }

  private sortDataGroup(data: AGroup[]): AGroup[] {
    let groups = data.slice();

    // get sort options
    let propertyA: number | string = '';
    let propertyB: number | string = '';

    return groups.sort((a, b) => {
      switch (this._sort.active) {
        case 'nom': [propertyA, propertyB] = [a.nom, b.nom]; break;
        case 'members': [propertyA, propertyB] = [a.members.split(',').length, b.members.split(',').length]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}

