import { ARank } from './../../interfaces/a-rank';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JulietUserService } from '../../services/juliet-user.service';

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
  @Output("rank")
  protected _rankChange= new EventEmitter();
  @Input()
  protected pseudo:String;

  protected rank:ARank;

  constructor(protected api:JulietUserService) { 
    
  }

  ngOnInit() {
    if(this._rank) this.rank = this._rank;
    this._rankChange.emit(this.rank);
  }

  ngOnChanges(changes) {
    console.log(changes);
  }
  
  
  ngDoCheck() {
    if(this.rank) {
      if(this.rank.ID != this._rank.ID) {
        this._rank = this.rank;
        console.log("emmiting");
        console.log(this.rank);
        this._rankChange.emit(this.rank);
      }
    }
  }  


}
