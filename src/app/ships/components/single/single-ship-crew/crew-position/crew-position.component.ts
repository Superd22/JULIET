import { ACrewPosition } from './../../../../interfaces/crew/a-crew-position';
import { Component, OnInit, Input, ViewEncapsulation, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'ju-ship-template-crew-position',
  templateUrl: './crew-position.component.html',
  styleUrls: ['./crew-position.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CrewPositionComponent implements OnInit {

  @Input()
  position: ACrewPosition;
  /** base width for the element (in px) */
  private _positionBaseWidth: number = 215;

  constructor(private el: ElementRef, private rendereer: Renderer) { }

  ngOnInit() {
  }

  public colectionOf(n: number) {
    return new Array(n).fill(0);
  }

  public resize(e) {
    this.position.size = this.boundResize(e);
  }

  public get minSize() {
    return this.position.size && this.position.size > 0 ? this.position.size * this._positionBaseWidth : this._positionBaseWidth;
  }

  private boundResize(e) {
    let margin = this._positionBaseWidth / 2;
    if (e.rectangle.width < this._positionBaseWidth + margin) return 1;
    else if (e.rectangle.width < this._positionBaseWidth * 2 + margin) return 2;
    else if (e.rectangle.width < this._positionBaseWidth * 3 + margin) return 3;
    else return 4;
  }

}
