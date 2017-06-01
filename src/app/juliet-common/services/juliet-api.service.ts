import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { JulietRightsService } from './juliet-rights.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class JulietAPIService {

  /** main api url for this env */
  public api = environment.julietAPI;
  /** latest callback with an error inside */
  private _latestErrorReturn:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(protected http: Http) { }

  // Builds custom parameters for a get 
  public buildParameters(arrayOfParam?: {}): URLSearchParams {
    let urlParam = new URLSearchParams();

    for (let paramKey in arrayOfParam) {
      if (arrayOfParam.hasOwnProperty(paramKey)) {
        urlParam.append(paramKey, arrayOfParam[paramKey]);
      }
    }
    if (environment.useDevDb) urlParam.append('UseDevDb', 'true');
    return urlParam;
  }

  public get(url: string, params?: {}) {
    return this.http.get(environment.julietAPI + url, { search: this.buildParameters(params), withCredentials: true })
      .map((res) => {
        let ret = res.json();
        this.mainErrorHandler(ret)
        return ret;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public post(url: string, params?: any, raw:boolean=true) {
    let payload = params || {};

    if(!raw) payload = this.buildParameters(payload);
    if (environment.useDevDb) payload["UseDevDb"] = true;

    // TO DO Add headers

    return this.http.post(environment.julietAPI + url, payload, { withCredentials: true })
      .map((res) => {
        let ret = res.json();
        this.mainErrorHandler(ret)
        return ret;
      }).share()
      .catch((error: any) => Observable.throw( typeof error.json == "function" ? error.json().error : 'Server Error'));
  }

  private mainErrorHandler(ret) {
    if(ret.error != null && ret.error == true) {
      this._latestErrorReturn.next(ret);
    }
  }

  public get onErrorPacket():BehaviorSubject<any> {
    return this._latestErrorReturn;
  }

}
