import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, TimeoutError, tap, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.storage.getToken() || null;
    if(token && !request.headers.has('Authorization')){
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          tz: tz,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
         (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // this.messageService.previousUrl = null;
            // do stuff with response if you want
          }
        },
        (error: any) => {
          let errorMessage = '';
          if (error instanceof ErrorEvent) {
            //------------------------------ client-side error--------------------------- //
            errorMessage = `Error: ${error.error.message}`;
            // alert
          } else {
            //----------------------------- server-side error----------------------------//
            errorMessage = `Error Code: ${error.status}\n Message:${error.message}`;
            if (error.status == 401) {
              if (error.error?.message === 'LOGGED_OUT') {
                this.storage.logout();
                return;
              }
              if (error.error?.message === 'SESSION_EXPIRED') {
                this.storage.logout();
              }
              if (error.error?.message === 'Access Denied') {
                this.storage.logout();
              }
            }
          }
          return throwError(() => new Error(errorMessage));
        }
      )
    );
  }

  // setRequestHeadersBasedOnUrl(request: any, url: string, token: string) {
  //   if(token && !request.headers.has('Authorization')){
  //     const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //     if(url.includes("dataBrowser/vendorSync") || url.includes("dataBrowser/poSync")) {
  //       return request.clone({
  //         setHeaders: {
  //           Authorization: `Bearer ${token}`,
  //           tz: tz,
  //           Authenticate: `Basic ${environment.syncAuthKey}`
  //         },
  //       });
  //     } else {
  //       return request.clone({
  //         setHeaders: {
  //           Authorization: `Bearer ${token}`,
  //           tz: tz,
  //         },
  //       });
  //     }
  //   }
  // }

}
