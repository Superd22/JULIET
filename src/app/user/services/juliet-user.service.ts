import { Injectable } from '@angular/core';
import { JulietAPIService } from '../../juliet-common/services/juliet-api.service';
import { AUser } from '../interfaces/a-user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JulietUserService {

  protected _namespace="Users/";

  constructor(protected api:JulietAPIService) { }

  public getUserInfo(userid?:Number):Observable<AUser> {
    if(!userid) userid = 0;

    return this.api.get(this._namespace+"GET_USER_INFO", {id: userid}).map(
      data => data.data
    );

  }

}
