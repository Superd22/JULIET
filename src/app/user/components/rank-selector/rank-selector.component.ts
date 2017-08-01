import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ARank } from '../../interfaces/a-rank';
import { JulietUserService } from '../../services/juliet-user.service';
import { JulietRightsService } from '../../../juliet-common/services/juliet-rights.service';

@Component({
  selector: 'ju-rank-selector',
  templateUrl: './rank-selector.component.html',
  styleUrls: ['./rank-selector.component.scss']
})
export class RankSelectorComponent implements OnInit {

  @Input()
  protected rank:ARank;
  @Output()
  protected rankChange= new EventEmitter();
  @Input()
  public canEdit:Boolean=false;

  protected possibleRanks:ARank[];
  protected possibleRanksFiltered:ARank[];

  private _currentStars;
  private _currentPos;
  private busy:Boolean=false;

  constructor(protected api:JulietUserService, private rights:JulietRightsService) { }

  ngOnInit() {
    this.newRank(true);
  }

  ngDoCheck() {
    if(this.rank.stars != this._currentStars) this.newRank();
  }

  ngOnChange(changes) {
  }

  private newRank(init?:Boolean) {
      this._currentStars = this.rank.stars;
      this.fetchRelevantRanks();
      if(init === null) this.rankChange.emit(this.rank);
  }

  protected fetchRelevantRanks() {
    this.busy = true;
    this.api.fetchRanksOfFleet(this.rank.type, this.rank.stars).subscribe(
      data => {
        this.possibleRanks = data;
        this.filterPossibleRanks();
        this.busy = false;
      }
    );
  }

  protected filterPossibleRanks() {
    this.possibleRanksFiltered = this.possibleRanks.sort(function(a, b) {
      return Number(a.pos) - Number(b.pos);
    });
  }

  protected selectRank(rank:ARank) {
    this.rank = rank;
    this.rankChange.emit(this.rank);
  }

}
