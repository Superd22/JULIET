import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JulietUserService } from '../../../services/juliet-user.service';

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
  constructor(protected api:JulietUserService) { }

  ngOnInit() {
  }

  public changeStars(star:Number) {
    // Double click on first star means no star.
    if(star === 1 && this._lastStarSelected === 1) star = 0;

    if(star != this._lastStarSelected) this._showSelect.emit(true);

    this._lastStarSelected = star;
    this.stars = star;

    this.starsChange.emit(star);
  }

}
