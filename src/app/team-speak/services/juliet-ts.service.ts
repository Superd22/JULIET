import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class JulietTsService {

  private namespace = "TS3/";

  constructor(public api: JulietAPIService) { }

  public getCurrentUserStatus() {
    return this.api.get(this.namespace + "USER_STATUS").map(
      data => data.data
    );
  }

  public deleteUser(userid?:Number) {
    if(!userid) userid = 0;
      return this.api.get(this.namespace + "REMOVE_USER", {id: userid}).map(
      data => data.data
    );  
  }

}
