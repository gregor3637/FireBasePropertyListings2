import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {

  elem:any;
  
  constructor(el: ElementRef) {
    this.elem = el;
       el.nativeElement.style.backgroundColor = 'red';
       console.log('Directive > ++');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.elem.nativeElement.style.backgroundColor = color;
  }
}
