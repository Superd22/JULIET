import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Injectable()
export class JulietAPIService {

  constructor(private http:Http) { }

  public get(url:string, params?:any) {
    return this.http.get(environment.julietAPI + url)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public post(url:string, params?:any) {
    return this.http.get(environment.julietAPI + url, params)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

}
