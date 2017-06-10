import { ATemplateCrew } from './../../../../interfaces/crew/a-template-crew';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'ju-ship-template-crew-container',
  templateUrl: './crew-container.component.html',
  styleUrls: ['./crew-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CrewContainerComponent implements OnInit {
  
  @Input()
  public crewManifest:ATemplateCrew;
  
  constructor() { }

  ngOnInit() {
  }

}
