import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    //console.log(value);
    this.el.nativeElement.value = value;
  }
}