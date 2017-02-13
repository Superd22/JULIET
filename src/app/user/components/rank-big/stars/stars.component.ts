import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JulietUserService } from '../../../services/juliet-user.service';
import { JulietRightsService } from '../../../../juliet-common/services/juliet-rights.service';

@Component({
  selector: 'ju-rank-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input()
  private stars:Number=0;
  @Output()
  private starsChange = new EventEmitter();
  @Output("starChange")
  protected _showSelect = new EventEmitter();
  private _lastStarSelected:Number;

  constructor(protected api:JulietUserService, protected rights:JulietRightsService) { }

  ngOnInit() {

  }

  public changeStars(star:Number) {
    if(!this.rights.userIsAdmin) return;

    // Double click on first star means no star.
    if(star === 1 && this._lastStarSelected === 1) star = 0;

    if(star != this._lastStarSelected) this._showSelect.emit(true);

    this._lastStarSelected = star;
    this.stars = star;

    this.starsChange.emit(star);
  }

}
