import { AEvent } from './../interfaces/a-event';
import { Observable } from 'rxjs/Observable';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Injectable } from '@angular/core';
import { ASummary } from '../interfaces/a-summary';

@Injectable()
export class JulietCalendarService {

  protected _trackedEvents:Observable<AEvent[]>;
  protected _trackedSingleEvent:Observable<ASummary>;
  protected _archiveCount:number=0;
  protected _namespace="Calendar/";
  constructor(public api:JulietAPIService) { }

  public fetchAllEvents(eStart, eMod) {
   this._trackedEvents = this.api.get(this._namespace+"getEventsphp",{eStart: eStart/1000, eMod: eMod}).map(
      data => data
    );
  }

  public fetchSingleEvent(eId) {
   this._trackedSingleEvent = this.api.get(this._namespace+"EVENT",{eId: eId}).map(
      data => data.data
    );
  }

  public getEvents():Observable<AEvent[]> {
    return this._trackedEvents; 
  }

  public getSingleEvent():Observable<ASummary> {
    return this._trackedSingleEvent; 
  }

  public getTotal():number {
    return this._archiveCount;
  }

  /*
    Fetches the archive of all event, including deleted one.
    If either post_per_page or page is < 0 then all posts are included.
    @param the number of post per page (default:30)
    @param the page offset
  */
  public fetchArchiveEvent(postPerPage=30, page=0) {
    this._trackedEvents = this.api.get(this._namespace+"ARCHIVE_EVENT",
    {post_per_page: postPerPage, page: page}).map(
      data => {
        this._archiveCount = data.data.count;
        return data.data.data;
      }
    );
  }

}
