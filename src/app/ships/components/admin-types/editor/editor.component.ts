import { JulietCommonHelperService } from './../../../../juliet-common/services/juliet-common-helper.service';
import { HangarAdminATypeComponent } from './../a-type/a-type.component';
import { JulietShipsService } from './../../../services/juliet-ships.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ShipModel } from './../../../interfaces/ship-model';
import { Component, OnInit, Input, EventEmitter, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'ju-hangar-admin-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class HangarAdminTypesEditorComponent implements OnInit {

  @Input()
  private ship: HangarAdminATypeComponent = null;
  @Output()
  private shipChange: EventEmitter<HangarAdminATypeComponent> = new EventEmitter<HangarAdminATypeComponent>();

  public shipForm: ShipModel;

  private newShip: ShipModel = {
    name: "",
    id: 0,
    ico: "",
    parent: 0,
    type: "",
  };


  public shipTypes: ShipModel[] = [];
  private shipTypesTypes: string[] = [];
  public filteredshipTypesTypes: Observable<string[]> = null;
  public typeCtrl: FormControl;
  public busy: boolean = false;
  @Output("updated")
  private updatedEvent: EventEmitter<void> = new EventEmitter<void>();


  constructor(private api: JulietShipsService, private helper: JulietCommonHelperService) {
    this.typeCtrl = new FormControl();
    this.filteredshipTypesTypes = this.typeCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterTypes(name));
  }

  private filterTypes(name: string) {
    let r = name ? this.shipTypesTypes.filter(s => new RegExp(`${name}`, 'gi').test(s))
      : this.shipTypesTypes;

    return r;
  }

  private init() {
    this.regenBackUp();
    this.api.getAllShipTypes().subscribe((ships) => {
      this.shipTypes = ships.sort((a, b) => a.name.localeCompare(b.name));
      this.regenTypesTypes();
    });
  }

  public displaySave() {
    return (this.ship === null && this.isDirty()) || this.displayReset();
  }

  public displayReset() {
    return (this.ship != null && this.ship.isDirty)
  }

  private regenTypesTypes() {
    this.shipTypes.forEach((shipModel) => {
      if (!this.shipTypesTypes.find((test) => test === shipModel.type.trim())) this.shipTypesTypes.push(shipModel.type);
    });

    this.shipTypesTypes.sort();
  }

  private regenBackUp() {
    this.shipForm = Object.assign({}, this.newShip);
  }

  private isDirty() {
    return this.helper.hasChangedObj(this.shipForm, this.newShip, ["name", "ico", "type", "parent"]);
  }

  /**
   * Used to reset the current form ship to a previous back-up
   * wheter we're creating new or updating old.
   */
  private resetShip() {
    if (this.ship) {
      this.ship.restoreBackUp();
      this.shipForm = this.ship.shipType;
    }
    else {
      this.regenBackUp();
    }
  }

  /**
   * Pushes the current shipForm to the db.
   */
  private saveShip() {
    let insert: boolean = this.shipForm.id == 0;
    if (!this.busy) {
      this.busy = true;
      this.api.updateShipType(this.shipForm).subscribe((shipModel: ShipModel) => {

        this.api.getAllShipTypes(true).subscribe(() => {
          this.busy = false
          this.resetNewShip();
          setTimeout(() => this.updatedEvent.emit(), 10);
        });

      });
    }
  }

  private deleteShip() {
    if (!this.busy && confirm("Êtes vous sur de vouloir définitivement supprimer ce type de vaisseau ?")) {
      this.busy = true;
      this.api.deleteShipType(this.shipForm).subscribe(() => {
        this.api.getAllShipTypes(true).subscribe(() => {
          this.busy = false;
          this.resetNewShip();
          setTimeout(() => this.updatedEvent.emit(), 10);
        });
      });
    }
  }

  public displayDelete() {
    return this.shipForm.id > 0;
  }

  /**
   * Resets all our bidings and fills the editor with a new ship.
   */
  resetNewShip() {
    this.ship = null;
    this.regenBackUp();
    this.shipChange.emit(null);
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(change: SimpleChanges) {
    if ("ship" in change) {
      if (change.ship.currentValue) this.shipForm = change.ship.currentValue.shipType;
    }

  }



}
