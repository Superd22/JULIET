import { Component, OnInit } from '@angular/core';
import { JulietCalendarService } from '../../../services/juliet-calendar.service';
import { AEvent } from '../../../interfaces/a-event';
import { StateService } from 'ui-router-ng2';
import { UrlizePipe } from '../../../../juliet-common/pipes/urlize.pipe';
import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})

export class ArchiveComponent implements OnInit {

  protected postPerPage:number = 30;
  protected page:number = 0;
  protected events:AEvent[];
  protected totalCount:number=0;
  protected busy:boolean=false;
  constructor(protected api:JulietCalendarService, public state:StateService) { }

  ngOnInit() {
    this.fetchEventForPage();
  }

  protected fetchEventForPage() {
    this.busy = true;
    this.api.fetchArchiveEvent(this.postPerPage, this.page);
    this.api.getEvents().subscribe(
      events => {
        this.events = events; 
        this.totalCount= this.api.getTotal();
        this.busy = false;
      }
    );
  }

  protected pageChanged(p) {
    this.page = p-1;
    this.fetchEventForPage();
  }

  protected goToEvent(event) {
    this.state.go("^.single", {
      slug: new UrlizePipe().transform(event.title),
      eId: event.id,
    });
  }

}
