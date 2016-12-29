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

  protected rankChanged(rank?) {
    window.setTimeout(() => {
      this.user.rank = rank;
      this.user.grade = this.user.rank.ID;
    });
  }

  protected hasMadeChanges():Boolean {
    if(!this.user || !this.userBackup) return false;
    
    var r = false;
    let u = this.user;
    let b = this.userBackup;

    if(
      u.callsign != b.callsign ||
      u.description != b.description ||
      u.fleet != b.fleet ||
      u.grade != b.grade ||
      u.handle != b.handle ||
      u.nom != b.nom ||
      u.pending != b.pending ||
      u.prenom != b.prenom 
    ) r = true;

    return r;
  }

  protected revertChanges() {
    this.user = Object.assign({}, this.userBackup);
  }

  protected updateUser() {
    
  }

}
