import { authState } from './../../states/auth.state';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  @Input()
  private _auth;
  private displaySplash:Boolean = true;
  private authed:Boolean = false;
  private error:Boolean = false;
  private errorMsg:String;
  
  constructor() { }

  ngOnInit() {
    this._auth.subscribe(
      data => {
        this.displaySplash = false;
        this.authed = data.data;
        this.error = data.error;
        this.errorMsg = data.msg;

        this.handleEndAuth();
      }
    )
  }

  private handleEndAuth() {
    if(this.authed) return;
    //let targetState = this.states.$current;

    /** if(this.errorMsg == "USER_NOT_LOGGED_IN")
      this.states.go("Login", {targetState: targetState});
    
    else this.states.go("UnAuth", {errorMsg: this.errorMsg}); **/
    
  }

}
