import { JulietAPIService } from './../../../juliet-common/services/juliet-api.service';
import { Component, OnInit } from '@angular/core';


export interface IJulietAPIPaypalCountData {
  error: boolean;
  data: {
    time: number;
    count: number;
  }
}

@Component({
  selector: 'ju-paypal-forum-header',
  templateUrl: './paypal-forum-header.component.html',
  styleUrls: ['./paypal-forum-header.component.scss']
})
export class PaypalForumHeaderComponent implements OnInit {

  /** monthly target goal */
  public goal: number = 30;
  public ammount: number = 0;

  constructor(private api: JulietAPIService) { }

  ngOnInit() {
    this.api.get("Common/paypal").subscribe((data: IJulietAPIPaypalCountData ) => {
      this.ammount = data.data.count;
    });
  }

  public getPercent() {
    var p = (this.ammount / this.goal) * 100;
    if (p > 100) return 100;
    else return p;
  }

}
