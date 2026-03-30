import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
  standalone: false
})
export class SafePipe implements PipeTransform {
  constructor(protected _sanitizer: DomSanitizer){}
  transform(url: string): SafeUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
