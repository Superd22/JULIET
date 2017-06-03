import { ReplaySubject } from 'rxjs/ReplaySubject';
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

    /**
   * Helper function to fetch and catch data into a given map
   * @param map the cache map
   * @param key the key for the current cache entry
   * @param force force update (otherwise use cache)
   * @param call the api call to make on update
   * @todo figure out if we need to buffer the maps > N entries
   */
  public fetchAndCache(map: Map<number, ReplaySubject<any>>, key: number, force: boolean, call: Observable<any>): ReplaySubject<any> {
    let cache = map.get(key);

    // Init our cache
    if (cache == null) {
      map.set(key, new ReplaySubject<any>(1));
      cache = map.get(key);
      call.subscribe((data) => {
        cache.next(data);
      });
    }
    else if (force) call.subscribe((data) => cache.next(data));

    return cache;
  }

}
