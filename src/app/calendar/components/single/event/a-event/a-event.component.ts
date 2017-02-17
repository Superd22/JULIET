import { Component, OnInit, Input } from '@angular/core';
import { AEvent } from '../../../../interfaces/a-event';
import { JulietUserNamesConverterService } from '../../../../../juliet-common/services/juliet-user-names-converter.service';
import { JulietRightsService } from '../../../../../juliet-common/services/juliet-rights.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ju-calendar-a-event',
  templateUrl: './a-event.component.html',
  styleUrls: ['./a-event.component.scss']
})
export class AEventComponent implements OnInit {

  @Input()
  protected event:AEvent;
  protected backupEvent:AEvent;
  protected invitedMembers= {};

  /** If the current user has admin rights on current event */
  private hasR:boolean=false;

  protected _minEventDate:NgbDateStruct={
    day: new Date().getDate(),
    month: new Date().getMonth()+1,
    year: new Date().getFullYear(),
  };

  protected eventStart;

  
  constructor(protected juNames:JulietUserNamesConverterService, protected rights:JulietRightsService) { }

  ngOnInit() {
    this.handleNames();
    this.getRights();
    this.handleCalendar();
    this.backupEvent = Object.assign({}, this.event);
  }

  /**
   * Handles fetching every type of names we need for display
   * (called on init)
   */
  protected handleNames() {
    let users = this.event.invitations.members;

    for(var i =0; i < users.length; i++) {
      this.juNames.addId(users[i].target);
    }

    this.juNames.fetchIds();

    users.forEach(u => {
      this.getNameById(u.target);
    });
  }

  protected handleCalendar() {

    // Init calendar on date.
    let d = new Date(Number(this.event.start)*1000);
    this.eventStart = {
      year: d.getFullYear(),
      month: d.getMonth()+1,
      day: d.getDate(),
    };

    
  }

  /**
   * Subsribe and update given user id
   * @param id the id to watch
   */
  protected getNameById(id:number) {
    this.juNames.getUserFromId(id).subscribe(
      user => {
        this.invitedMembers[id] = user
      }
    ); 
  }

  /**
   * Check if current users has rights for editing
   * (called on init)
   */
  protected getRights() {
    this.rights.user_can("USER_CAN_ADMIN_EVENT",0,this.event.id).subscribe(
      data => this.hasR = data.data
    )
  }

  /**
   * Trigerred when the start date for the event is changed.
   * @param event
   */
  protected dateChanged(event:NgbDateStruct) {
    let d = new Date(event.year,event.month-1,event.day);

    this.event.start = d.getTime()/1000;
    console.log(event);
  }

  /**
   * Check current event object with back-up to see if user changed
   * any data.
   * (Sometime i wish you could surcharge = in ts)
   */
  protected hasEventChanged() {
    let a = this.backupEvent;
    let b = this.event;
    
    return a.title == b.title &&
    a.start == b.start &&
    a.text == b.text &&
    a.private == b.private &&
    a.membersMax == b.membersMax;
  }

}
