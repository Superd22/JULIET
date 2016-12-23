import { JulietRightsService } from './../../services/juliet-rights.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private pseudo;
  private password;
  private busy:Boolean=false;

  constructor(public rights: JulietRightsService) { }

  ngOnInit() {
  }

  private doLogin() {
    this.busy = true;
  }

}
