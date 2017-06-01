import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[JuAlignShipIco]'
})
export class AlignShipIcoDirective {

  constructor(el: ElementRef) {
    this.render(el);
  }

  private findParentContainer(e: HTMLElement): HTMLElement {
    let p = e.parentElement;

    if (p == null) throw "No parent container for JuAlignShipIco.";
    if (p.classList.contains("align-parent")) return p;
    else return this.findParentContainer(p);
  }

  private render(el: ElementRef) {
    let e: HTMLElement = el.nativeElement;
    e.addEventListener("load", () => {
      let height = e.clientHeight;
      let parent = window.getComputedStyle(this.findParentContainer(e));

      let pHeight:number = Number(parent.height.replace("px","")) + Number(parent.paddingTop.replace("px","")) + Number(parent.paddingBottom.replace("px",""));

      let margin_top = 0;
      if (height < pHeight) margin_top = (pHeight - height) / 2;

      e.parentElement.style.marginTop = margin_top + "px";
    });
  }

}
