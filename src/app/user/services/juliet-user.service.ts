import { AUserExtended } from './../interfaces/a-user-extended';
import { Injectable } from '@angular/core';
import { JulietAPIService } from '../../juliet-common/services/juliet-api.service';
import { AUser } from '../interfaces/a-user';
import { Observable } from 'rxjs/Observable';
import { JuWing } from '../enums/ju-wing.enum';

@Injectable()
export class JulietUserService {

  protected _namespace = "Users/";

  constructor(protected api: JulietAPIService) { }

  public getUserFiche(userid?: Number): Observable<AUserExtended> {
    if (!userid) userid = 0;

    return this.api.get(this._namespace + "GET_USER_FICHE", { id: userid }).map(
      data => data.data
    );

  }

  public getUserInfo(userid?: Number): Observable<AUser> {
    if (!userid) userid = 0;

    return this.api.get(this._namespace + "GET_USER_INFO", { id: userid }).map(
      data => data.data
    );

  }

  // Fetches the list of ranks for the given fleet
  public fetchRanksOfFleet(fleetId:JuWing, stars?:Number) {
    
  }

}
