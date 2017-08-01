import { ACrewPosition } from './../../../interfaces/crew/a-crew-position';
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
  /** if we're in edit mod */
  private _editMod:boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

  public get crewCompliment() {
    return this.template.crew_compliment;
  }
  public get positions() {
    return this.crewCompliment.positions;
  }
  public get crewMembers() {
    return this.crewCompliment.crew;
  }

  public get editMod():boolean {
    return this._editMod;
  }

  public toggleEditMod() {
    this._editMod = !this._editMod;
  }

  public log(event) {
    console.log("DND", event);
  }

  public addNewPosition() {
    let position:ACrewPosition={
      id:0,
      template_id:this.template.id,
      name:null,
      parent:null,
      size:1,
      amount:1,
    };

    this.positions.push(position);
  }

}
