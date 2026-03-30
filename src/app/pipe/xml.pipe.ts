import { Pipe, PipeTransform } from '@angular/core';
import * as vkbeautify from 'vkbeautify';
@Pipe({
  name: 'xml',
  standalone: false
})
export class XmlPipe implements PipeTransform {
  transform(value: any): any {
    value = value || '';
    return vkbeautify.xml(value);
  }
}
