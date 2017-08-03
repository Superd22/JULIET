import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ju-full-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class JuV3FullGroupComponent implements OnInit {

  @Input("groupId")
  private _groupId: number;

  constructor() { }

  ngOnInit() {
  }

}
