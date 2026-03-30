import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  constructor() {}
  isPositiveInteger(str: any) {
    if (typeof str !== 'string') {
      return false;
    }
    const num = Number(str);
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
    return false;
  }

  convertToBase64(file: File) {
    return new Observable((observable) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        observable.next(reader.result);
      };
    });
  }

  getInititals(inputStr: string) {
    const initials = inputStr
      ?.split(' ')
      .reduce(
        (result, currentWord) =>
          result + '' + currentWord.charAt(0).toUpperCase(),
        ''
      );
    return initials;
  }
}
