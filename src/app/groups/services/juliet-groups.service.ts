import { Injectable } from '@angular/core';
import { JulietAPIService } from '../../juliet-common/services/juliet-api.service';
import { AGroup } from '../interfaces/a-group';

@Injectable()
export class JulietGroupsService {

  constructor(public api:JulietAPIService) { }
  public groupList:AGroup[];
  public groupListCount;
  private namespace = "Groups/"

  /*
    Gets groups from back-end 
  */
  public listGroups(limit=null, offset=null) {
    return this.api.get(this.namespace + "LIST_GROUPS", {limit:limit, offset: offset}).map(
      data => {
        this.groupListCount = data.count;
        this.groupList = data;
      }
    );
  }


}
