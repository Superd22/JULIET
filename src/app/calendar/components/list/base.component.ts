import { AEvent } from './../../interfaces/a-event';
import { JulietCalendarService } from './../../services/juliet-calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'base-calendar',
})
export class BaseCalendarComponent implements OnInit {

  protected _eMod = "week";
  protected _eStart: Number;
  protected events: AEvent[];

  constructor(protected api: JulietCalendarService) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    this._eStart = today.getTime();
    console.log("prout");
    api.fetchAllEvents(this._eStart, this._eMod);

    this.api.getEvents().subscribe(
      data => this.events = data
    )


  }

  ngOnInit() {

  }

}
