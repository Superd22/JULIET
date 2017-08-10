import { Observable } from 'rxjs/Observable';
import { SeoUrlPipe } from './../../juliet-common/pipes/seo-url.pipe';
import { StateService } from '@uirouter/angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { JulietAPIService } from '../../juliet-common/services/juliet-api.service';
import { AGroup } from '../interfaces/a-group';

@Injectable()
export class JulietGroupsService {

  constructor(public api: JulietAPIService, public state: StateService) { }
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

  /**
   * 
   * @param id 
   */
  public getFullGroup(id: number): Observable<AGroup> {
    return this.api.get(this.namespace + "Group/view", { groupId: id }).map(
      (data) => {
        return data.data;
      }
    )
  }

  public goToSingleGroupState(group: AGroup) {
    console.log("euh?!");
    this.state.go("secure.Groups.single", { group: group, groupId: group.id, groupSlug: new SeoUrlPipe().transform(group.nom) });
  }


}
