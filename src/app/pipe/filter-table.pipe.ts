import { Pipe, PipeTransform } from '@angular/core';
import * as vkbeautify from 'vkbeautify';
@Pipe({
  name: 'filterTable',
  standalone: false
})
export class FilterTable implements PipeTransform {
    transform(items: any, arg?: any): any {
        if (arg === 'H') {
          return items.filter((item:any)=> item.category === 'H');
        } else {
          return items.filter((item:any)=> item.category === 'L');
        }
      }
}
