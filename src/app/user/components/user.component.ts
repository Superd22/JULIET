import { Component, OnInit, Input } from '@angular/core';
import { JulietUserService } from '../services/juliet-user.service';
import { AUser } from '../interfaces/a-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  private _userId:Number;

  private busy:Boolean=false;
  
  protected user:AUser;
  constructor(protected api:JulietUserService) { }

  ngOnInit() {
    this.busy = true;
    this.api.getUserInfo(this._userId).subscribe(
      data => {this.user = data; this.busy = false;}
    );
  }

}
