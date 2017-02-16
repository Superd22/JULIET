import { Component, OnInit, Input } from '@angular/core';
import { JulietCalendarService } from '../../../services/juliet-calendar.service';
import { AEvent } from '../../../interfaces/a-event';
import { ASummary } from '../../../interfaces/a-summary';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input()
  protected _eId:number;
  protected summary:ASummary=null;
  protected busy:boolean=false;

  constructor(protected api:JulietCalendarService) { }

  ngOnInit() {
    this.fetchEvent();
  }

  protected fetchEvent() {
    console.log(this._eId);
    if(this._eId > 0) {
      this.busy = true;
      this.api.fetchSingleEvent(this._eId);
      this.api.getSingleEvent().subscribe(
        event => {
          this.summary = event;
          this.busy = false;
        }
      )
    }
  }

}
