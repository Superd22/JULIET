import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ju-rank-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input()
  private stars:Number=0;
  constructor() { }

  ngOnInit() {
  }

}
