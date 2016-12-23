import { JulietAPIService } from './juliet-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class JulietRightsService {

  constructor(public api:JulietAPIService) { }

  public user_can(right:String, userId?:Number, target?:Number) {
    if(!userId) userId = 0;

    return this.api.get("Rights/"+right).map(
      data => data
    );
  }

  public can_see_juliet() {
    return this.user_can("USER_CAN_SEE_JULIET");
  }

}
