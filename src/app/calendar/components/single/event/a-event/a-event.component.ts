import { Component, OnInit, Input } from '@angular/core';
import { AEvent } from '../../../../interfaces/a-event';
import { JulietUserNamesConverterService } from '../../../../../juliet-common/services/juliet-user-names-converter.service';

@Component({
  selector: 'ju-calendar-a-event',
  templateUrl: './a-event.component.html',
  styleUrls: ['./a-event.component.scss']
})
export class AEventComponent implements OnInit {

  @Input()
  protected event:AEvent;

  protected invitedMembers = [];
  
  constructor(protected juNames:JulietUserNamesConverterService) { }

  ngOnInit() {
    this.handleNames();
  }

  protected handleNames() {
    let users = this.event.invitations.members;

    for(var i =0; i < users.length; i++) {
      this.juNames.addId(users[i].target);
    }

    this.juNames.fetchIds();

    users.forEach(u => {
      this.invitedMembers.push(this.getNameById(u.target));
    });

    console.log(this.invitedMembers)
  }

  protected getNameById(id:number) {
    return this.juNames.getUserFromId(id).subscribe(
      user => user.username
    );
  }

}
