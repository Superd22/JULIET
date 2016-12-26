import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ju-tag-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  @Input()
  protected userId;
  
  constructor() { }

  ngOnInit() {
  }

}
