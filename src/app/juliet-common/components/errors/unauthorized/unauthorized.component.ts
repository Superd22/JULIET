import { JulietCommonHelperService } from './../../../services/juliet-common-helper.service';
import { StateService, Transition } from '@uirouter/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ju-state-error-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class ErrorUnauthorizedComponent implements OnInit {


  public requiredRight: string = "USER_NO_RIGHTS";
  private _backwards: Transition = null;

  constructor(private state: StateService, private helper: JulietCommonHelperService) { }

  ngOnInit() {
    this.requiredRight = this.state.params.required;
    //this._backwards = this.helper.getNLatestTransition(2);
  }

  public getBack() {
    if (this._backwards) {
      this.state.go(this._backwards.$to());
    }
    else this.getHome();
  }

  public canGetBack() {
    return this._backwards != null;
  }

  public getHome() {
    this.state.go("secure.Default");
  }

}
