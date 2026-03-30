import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiQueryParamsService {
  constructor() {}
  /**
   * return respective url based on paramenter
   * @param args resquesting query string args
   */
  get(args: any) {
    let queryString: string = '';
    let endPoint: string = '';

    //checks
    if (args != null && Object.keys(args).length > 0) {
      queryString = Object.keys(args)
        .map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
        })
        .join('&');
    }

    //return
    return queryString != '' ? endPoint + '?' + queryString : endPoint;
  }
}
