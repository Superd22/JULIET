import { Component, OnInit, Input } from '@angular/core';
import { JuLightUser } from '../../../interfaces/ju-light-user';

@Component({
  selector: 'a-small-user',
  templateUrl: './a-small-user.component.html',
  styleUrls: ['./a-small-user.component.scss']
})
export class ASmallUserComponent implements OnInit {

  @Input()
  /** The user to display */
  protected user:JuLightUser;

  @Input('userId')
  /** (todo) fetch user by userId */
  protected _userId:Number;

  constructor() { }

  ngOnInit() {
  }

}
