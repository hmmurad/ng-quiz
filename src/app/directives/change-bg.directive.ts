import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input()  isCorrect: boolean = false;

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer() {
    if(this.isCorrect) {
      this.render.setStyle(this.el.nativeElement, 'background', '#20c997')
      this.render.setStyle(this.el.nativeElement, 'color', 'white')
      this.render.setStyle(this.el.nativeElement, 'border', '1px solid #20c997')
    } else {
      this.render.setStyle(this.el.nativeElement, 'background', '#ffc107')
      this.render.setStyle(this.el.nativeElement, 'color', 'white')
      this.render.setStyle(this.el.nativeElement, 'border', '1px solid #ffc107')
    }
  }

}
