import { JulietCalendarService } from './../../../services/juliet-calendar.service';
import { BaseCalendarComponent } from './../base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent extends BaseCalendarComponent {
  
  public constructor(public api:JulietCalendarService) {
    super(api);
  }
  
  ngOnInit() {
  }

}
