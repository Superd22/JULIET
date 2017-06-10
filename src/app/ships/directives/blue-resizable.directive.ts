import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[JuBlueResizable]'
})
export class BlueResizableDirective {

  @Output()
  private resized: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('mousedown', ['$event'])
  onDown(e: Event) {
    console.log('down',e);
  }
  constructor(private el: ElementRef) { }

  ngOnInit() {
    console.log("prut");
  }
}
