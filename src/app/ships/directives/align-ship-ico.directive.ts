import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[JuAlignShipIco]'
})
export class AlignShipIcoDirective {

  constructor(el: ElementRef) {
    this.render(el);
  }

  private render(el: ElementRef) {
    let e: HTMLElement = el.nativeElement;
    e.addEventListener("load", () => {
      let height = e.clientHeight;

      if (height >= 50) return;

      let margin_top = (50 - height) / 2;

      e.parentElement.style.marginTop = margin_top + "px";
    });
  }

}
