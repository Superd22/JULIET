import { ARank } from './../../interfaces/a-rank';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ju-user-rank-big',
  templateUrl: './rank-big.component.html',
  styleUrls: ['./rank-big.component.scss']
})
export class RankBigComponent implements OnInit {

  @Input("rankId")
  private _rankId:Number;
  @Input("rank")
  private _rank:ARank;

  @Input()
  protected pseudo:String;

  protected rank:ARank;
  constructor() { }

  ngOnInit() {
    if(this._rank) this.rank = this._rank;
  }

}
