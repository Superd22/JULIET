import { Component, OnInit, Input } from '@angular/core';
import { ASummary } from '../../../../interfaces/a-summary';

@Component({
  selector: 'ju-calendar-event-invit',
  templateUrl: './event-invit.component.html',
  styleUrls: ['./event-invit.component.scss']
})
export class EventInvitComponent implements OnInit {

  @Input()
  protected summary:ASummary;
  constructor() { }

  ngOnInit() {
  }

}
