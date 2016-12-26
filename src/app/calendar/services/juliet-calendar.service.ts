import { AEvent } from './../interfaces/a-event';
import { Observable } from 'rxjs/Observable';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class JulietCalendarService {

  protected _trackedEvents:Observable<AEvent[]>;
  protected _trackedSingleEvent:Observable<AEvent>;
  protected _namespace="Calendar/";
  constructor(public api:JulietAPIService) { }

  public fetchAllEvents(eStart, eMod) {
   this._trackedEvents = this.api.get(this._namespace+"getEventsphp",{eStart: eStart/1000, eMod: eMod}).map(
      data => data
    );
  }

  public fetchSingleEvent(eId) {
   this._trackedSingleEvent = this.api.get(this._namespace+"getSinglephp",{eId: eId}).map(
      data => data.data
    );
  }

  public getEvents():Observable<AEvent[]> {
    return this._trackedEvents; 
  }

  public getSingleEvent():Observable<AEvent> {
    return this._trackedSingleEvent; 
  }

}
