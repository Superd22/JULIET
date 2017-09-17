import { JulietGroupsService } from './../../services/juliet-groups.service';
import { JulietShipsService } from './../../../ships/services/juliet-ships.service';
import { StateService } from '@uirouter/angular';
import { Component, OnInit, Input } from '@angular/core';
import { AGroup } from "../../interfaces/a-group";

@Component({
  selector: 'ju-full-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class JuV3FullGroupComponent implements OnInit {

  @Input("groupId")
  private _groupId: number;

  @Input("group")
  private _group: AGroup;

  public get group(): AGroup {
    return this._group;
  }

  constructor(private state: StateService, private api: JulietGroupsService) { }

  ngOnInit() {
    this._computeGroupId();
    this._fetchGroup();
  }

  private _computeGroupId() {
    if (this._group) return;
    if (this._groupId) return;
    if (this.state.params['group']) { this._group = this.state.params['group']; return; }
    if (this.state.params["groupId"]) { this._groupId = this.state.params["groupId"]; return; }

    throw "Cannot compute groupId from any source."
  }

  private _fetchGroup(force?: boolean) {
    if (force || !this._group) {
      this.api.getFullGroup(this._groupId).subscribe(
        group => this._group = group
      );
    }
  }

}
