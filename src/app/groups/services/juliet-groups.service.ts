import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { JulietAPIService } from '../../juliet-common/services/juliet-api.service';
import { AGroup } from '../interfaces/a-group';

@Injectable()
export class JulietGroupsService {

  constructor(public api: JulietAPIService) { }
  private _groupList: BehaviorSubject<AGroup[]> = new BehaviorSubject([]);
  public groupListCount;
  private namespace = "Groups/"

  /*
    Gets groups from back-end 
  */
  public listGroups(limit = null, offset = null) {
    return this.api.get(this.namespace + "LIST_GROUPS", { limit: limit, offset: offset }).map(
      (data: { data: { count: number, data: AGroup[] }, error: boolean }) => {
        this.groupListCount = data.data.count;
        this._groupList.next(data.data.data);
      }
    );
  }

  public get groupList() {
    return this._groupList;
  }


}
