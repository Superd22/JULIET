import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'ju-v3-pannel-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  /**
   * FIREFOX DOESNT SUPPORT IT :(
   * encapsulation: ViewEncapsulation.Emulated
   */
})
export class V3PannelTitle implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
