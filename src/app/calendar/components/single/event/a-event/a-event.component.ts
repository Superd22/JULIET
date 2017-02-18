import { Component, OnInit, Input } from '@angular/core';
import { AEvent } from '../../../../interfaces/a-event';
import { JulietUserNamesConverterService } from '../../../../../juliet-common/services/juliet-user-names-converter.service';
import { JulietRightsService } from '../../../../../juliet-common/services/juliet-rights.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JulietCommonHelperService } from '../../../../../juliet-common/services/juliet-common-helper.service';
import { CompleterData } from 'ng2-completer';
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'ju-calendar-a-event',
  templateUrl: './a-event.component.html',
  styleUrls: ['./a-event.component.scss']
})
export class AEventComponent implements OnInit {

  @Input()
  protected event:AEvent;
  protected backupEvent:AEvent;
  protected users={};

  /** If the current user has admin rights on current event */
  private hasR:boolean=false;

  protected dsPerm:CompleterData;
  protected dsInvit:CompleterData;
  protected dsGroup:CompleterData;
  protected dsTag:CompleterData;

  protected ngc = {
    perm: null,
  }

  protected _minEventDate:NgbDateStruct={
    day: new Date().getDate(),
    month: new Date().getMonth()+1,
    year: new Date().getFullYear(),
  };

  protected eventStart;

  
  constructor(protected juNames:JulietUserNamesConverterService, 
  protected rights:JulietRightsService, protected helper:JulietCommonHelperService,
  protected mdSnack:MdSnackBar) {
    this.dsPerm  = helper.buildCompleter("username", `Common/UserSearch/?f=`);
    this.dsInvit = helper.buildCompleter("username", `Common/UserSearch/?f=`);
  }

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
    return this.juNames.getUserFromId(id).subscribe(
      user => this.users[id] = user
    ); 
  }

  /**
   * Check if current users has rights for editing
   * (called on init)
   */
  protected getRights() {
    this.rights.user_can("USER_CAN_ADMIN_EVENT",0,this.event.id).subscribe(
      data => {this.hasR = data.data; console.log('r:'+data.data);}
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

  /** 
   * EVENT SUB-MANAGMENT
   */

  /**
   * PERMS (= Organisateur)
   */

  /**
   * Add an organisateur (perm) to the event
   * @param id the id of the user to make orga.
   */
  protected addPerm(id:number) {

    // Reject if user already has perms
    if(this.event.perm.indexOf(id) != -1) {
      let username = this.users[id].username;
      this.mdSnack.open(username+" est déjà organisateur.");

      this.ngc.perm = "";
      return false;
    }

    // Add the user
    this.getNameById(id);
    this.event.perm.push(id);


    let username = this.users[id].username;
    this.mdSnack.open(username+" est maintenant organisateur.");
  }

}
