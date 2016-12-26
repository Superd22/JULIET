import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  protected user={
    id: 0,
    handle:"",
    prenom:"",
    nom:"",
    callsign:"",
    description:"",
  }
  constructor() { }

  ngOnInit() {
  }

}
