import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class JulietAPIService {

  // To do env.
  public api = "http://www.scfr.fr/API/Juliet/";

  constructor(private http: Http) { }

  // Builds custom parameters for a get 
  public buildParameters(arrayOfParam?: {}): URLSearchParams {
    let urlParam = new URLSearchParams();

    for (let paramKey in arrayOfParam) {
      if (arrayOfParam.hasOwnProperty(paramKey)) {
        urlParam.append(paramKey, arrayOfParam[paramKey]);
      }
    }
    console.log(urlParam);
    return urlParam;
  }

  public get(url: string, params?: {}) {
    return this.http.get(environment.julietAPI + url, {search: this.buildParameters(params), withCredentials: true })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public post(url: string, params?: any) {
    return this.http.post(environment.julietAPI + url, params, { withCredentials: true })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

}
