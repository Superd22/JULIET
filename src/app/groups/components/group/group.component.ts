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

  constructor(private state: StateService) { }

  ngOnInit() {
    this._computeGroupId();
    this._fetchGroup(true);
  }

  private _computeGroupId() {
    if (this._group) return;
    if (this._groupId) return;
    if (this.state.params["groupId"]) { this._groupId = this.state.params["groupId"]; return; }
    throw "Cannot compute groupId from any sources."
  }

  private _fetchGroup(force?: boolean) {
    if (force || !this._group) {
      
    }
  }

}
