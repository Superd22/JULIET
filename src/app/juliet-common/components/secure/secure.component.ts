import { authState } from './../../states/auth.state';
import { StateService } from '@uirouter/angular';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JulietRightsService } from '../../services/juliet-rights.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  @Input()
  private _auth:BehaviorSubject<boolean>;
  public displaySplash:Boolean = true;
  public authed:Boolean = false;
  private error:Boolean = false;
  private errorMsg:String;
  
  constructor(private states:StateService, private rights:JulietRightsService) { }

  ngOnInit() {
    this.handleAuthStatus();
    this.handleEndAuth();
  }

  private handleAuthStatus() {
    this._auth.subscribe(
      data => {
        this.displaySplash = false;
        this.authed = data;

      }
    )
  }

  private handleEndAuth() {
    this.rights.authorizePacket.subscribe( (authPacket) =>  {
      if(authPacket !== null) {
        let targetState = this.states.$current;
        if(authPacket.error == true) {
          if(authPacket.msg == "USER_NOT_LOGGED_IN")
            this.states.go("Login", {targetState: targetState});
          else this.states.go("UnAuth", {errorMsg: this.errorMsg});
        }
      }
    });
  }

}
