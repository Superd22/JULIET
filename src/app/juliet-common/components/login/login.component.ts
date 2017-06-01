import { StateService } from '@uirouter/angular';
import { MdSnackBar } from '@angular/material';
import { JulietRightsService } from './../../services/juliet-rights.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public pseudo;
  public password;
  public busy: Boolean = false;
  @Input()
  protected _targetState;

  constructor(protected rights: JulietRightsService, protected snackBar: MdSnackBar, protected states:StateService) { }

  ngOnInit() {  }

  public doLogin() {
    this.busy = true;
    this.rights.doLogin(this.pseudo, this.password).subscribe(
      data => {
        this.rights.can_see_juliet().subscribe(
          data => {
            this.busy = false;

            if (data) {
              this.snackBar.open("Vous êtes maintenant connecté", null, { duration: 5000 });
              this.states.go(this._targetState);
              return;
            }
            else this.snackBar.open("Impossible de vous connecter, verifiez vos identifiants.", null, { duration: 5000 });
          }
        )
      }
    );
  }

}
