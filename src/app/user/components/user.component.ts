import { Component, OnInit, Input } from '@angular/core';
import { JulietUserService } from '../services/juliet-user.service';
import { AUser } from '../interfaces/a-user';
import { AUserExtended } from '../interfaces/a-user-extended';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  private _userId:Number;

  private busy:Boolean=false;
  
  protected user:AUserExtended;
  protected userBackup:AUserExtended;
  constructor(protected api:JulietUserService) { }

  ngOnInit() {
    this.busy = true;
    this.api.getUserFiche(this._userId).subscribe(
      data => {
        this.user = data;
        this.userBackup = Object.assign({}, data);
        this.busy = false;
      }
    );
  }

}
