import { ARank } from './../../interfaces/a-rank';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JulietUserService } from '../../services/juliet-user.service';
import { AUserExtended } from '../../interfaces/a-user-extended';
import { AUser } from '../../interfaces/a-user';
import { JulietRightsService } from '../../../juliet-common/services/juliet-rights.service';

@Component({
  selector: 'ju-user-rank-big',
  templateUrl: './rank-big.component.html',
  styleUrls: ['./rank-big.component.scss']
})
export class RankBigComponent implements OnInit {

  @Input("rankId")
  private _rankId: Number;
  @Input("rank")
  private _rank: ARank;
  @Output("rank")
  protected _rankChange = new EventEmitter();
  @Input()
  protected user: AUser;

  public rank: ARank;
  public showSelect: Boolean = false;

  private canEdit: Boolean = false;

  constructor(protected api: JulietUserService, protected rights: JulietRightsService) {

  }

  ngOnInit() {
    if (this._rank) this.rank = this._rank;
    this._rankChange.emit(this.rank);

    this.canEdit = this.rights.userIsAdmin || this.rights.userId == this.user.id_forum;
  }

  ngDoCheck() {
    if (this.rank) {
      if (this.rank.ID != this._rank.ID) {
        this._rank = this.rank;
        console.log("emmiting");
        console.log(this.rank);
        this._rankChange.emit(this.rank);
      }
    }
  }


}
