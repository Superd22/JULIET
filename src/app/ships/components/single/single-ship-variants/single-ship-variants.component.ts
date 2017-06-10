import { JulietRightsService } from './../../../../juliet-common/services/juliet-rights.service';
import { JulietCommonHelperService } from './../../../../juliet-common/services/juliet-common-helper.service';
import { AShipTemplate } from './../../../interfaces/a-template';
import { JulietShipsService } from './../../../services/juliet-ships.service';
import { AShip } from './../../../interfaces/a-ship';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MdSelectChange } from "@angular/material/";

@Component({
  selector: 'ju-single-ship-variants',
  templateUrl: './single-ship-variants.component.html',
  styleUrls: ['./single-ship-variants.component.scss']
})
export class SingleShipVariantsComponent implements OnInit, OnChanges {

  @Input("ship")
  private _ship: AShip;
  @Input("shipId")
  private _shipId: number;

  /** the template we're currently editing */
  public currentTemplate: AShipTemplate = null;

  private backUpTemplate: AShipTemplate = null;

  public ship: AShip;
  /** our selected template id from the select element */
  public selectedTemplate: number;

  public busy: boolean = false;

  public hasR: boolean = false;

  constructor(protected api: JulietShipsService, protected helper: JulietCommonHelperService, protected rights: JulietRightsService) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }


  private init() {
    if (this._ship != null) this._shipId = this._ship.id;
    if (this._shipId > 0) {
      this.api.getShip(this._shipId).subscribe(
        (ship) => this.ship = ship
      )
    }
    if(this.ship.templates.length > 0) this.pickTemplate(this.ship.templates[this.ship.templates.length-1]);

    this.rights.user_can("USER_CAN_EDIT_SHIP_TAGS", 0, this.ship.id).subscribe((can) => this.hasR = can);
  }

  public selectTemplate(template: AShipTemplate) {
    this.currentTemplate = template;
    this.generateTemplateBackUp();
  }

  private generateTemplateBackUp() {
    this.backUpTemplate = Object.assign({}, this.currentTemplate);
  }

  public newTemplate() {
    this.pickTemplate({
      id: 0,
      name: "",
      ship_id: this._shipId,
      ship_type_id: null,
      crew_compliment: null,
    });
  }

  public pickTemplate(template: AShipTemplate) {
    this.currentTemplate = template;
    this.selectedTemplate = template.id;
    this.generateTemplateBackUp();
  }

  public templateHasChanged() {
    return this.helper.hasChangedObj(this.currentTemplate, this.backUpTemplate, ["name"]);
  }

  public canEdit() {
    return true;
  }

  public deleteTemplate() {
    this.busy = true;
    this.api.deleteShipTemplate(this.currentTemplate).subscribe((done) => {
      this.busy = false;
      if (!done) return false;
      else {
        this.ship.templates.splice(this.ship.templates.findIndex((test) => test.id == this.currentTemplate.id), 1);
        this.pickTemplate(null);
      }
    });
  }

  public updateTemplate() {
    this.busy = true;
    this.api.updateShipTemplate(this.currentTemplate).subscribe((newTemplate) => {
      this.busy = false;

      if (!newTemplate) return false;

      if (this.currentTemplate.id == 0) {
        this.ship.templates.push(newTemplate);
        this.pickTemplate(newTemplate);
      }
      else {
        let id = this.ship.templates.findIndex((test) => test.id == newTemplate.id);
        this.ship.templates[id] = newTemplate;
        this.pickTemplate(this.ship.templates[id]);
      }

    });
  }

  public selectNewTemplate(newTemplate: MdSelectChange) {
    let id = this.ship.templates.findIndex((test) => test.id == newTemplate.value);
    this.selectTemplate(this.ship.templates[id]);
  }

  public shouldDisplayUpdateButton() {
    return this.hasR && this.canEdit() && this.templateHasChanged();
  }

  public shouldDisplayDeleteButton() {
    return this.hasR && this.canEdit() && this.currentTemplate && this.currentTemplate.id > 0;
  }

}
