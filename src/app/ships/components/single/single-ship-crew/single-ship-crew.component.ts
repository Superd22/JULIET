import { AShipTemplate } from './../../../interfaces/a-template';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ju-single-ship-crew',
  templateUrl: './single-ship-crew.component.html',
  styleUrls: ['./single-ship-crew.component.scss']
})
export class SingleShipCrewComponent implements OnInit {

  @Input()
  /** the ship template this component belongs to / will display */
  public template: AShipTemplate = null;

  constructor() { }

  ngOnInit() {
  }

}
