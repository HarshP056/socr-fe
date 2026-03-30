import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class SSOService {
  private apiUrl: string = environment.apiUrl;
  private apiSSOConfigUrl: string = environment.apiUrl+'ssoClientConfig';
  

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  getAllSSOConfig(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiSSOConfigUrl}/findAll`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }
  
  getSSOClientConfigById(id: any): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiSSOConfigUrl}/${id}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }
  saveSSOClientConfig(obj: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiSSOConfigUrl}/save`, obj).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            observable.next(res.result);
            return;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
          observable.error(err);
        },
      });
    });
  }
  
  updateSSOClientConfig(obj:any, id: any) {
    return new Observable((observable) => {
      this.http.put(`${this.apiSSOConfigUrl}/${id}`, obj).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            observable.next(res.result);
            return;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
          observable.error(err);
        },
      });
    });
  }

  deleteSSOConfig(id: any) {
    return new Observable((observable) => {
      this.http.delete(`${this.apiSSOConfigUrl}/${id}`).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          observable.next(res);
          return;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
          observable.error(err);
        },
      });
    });
  }

  googleSSO() {
    window.open(`${this.apiUrl}sso/google/signin`, '_self')
  }

  validateGoogle(args: any): Observable<any> {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}sso/google/validate?code=${args}`)
        .subscribe({
          next: (res: any) => {
            if (res.status == 'failed') {
              observable.error(res);
              // this.toastr.error({
              //   detail: 'Error',
              //   summary: res.message,
              //   duration: 5000,
              // });
              return;
            }
            observable.next(res.result);
          },
          error: (err) => {
            observable.error(err);
          },
        });
    });
  }

  microsoftSSO() {
    window.open(`${this.apiUrl}sso/ms/signin`, '_self')
  }

  validateMicrosoft(args: any): Observable<any> {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}sso/ms/validate?code=${args}`)
        .subscribe({
          next: (res: any) => {
            if (res.status == 'failed') {
              observable.error(res);
              // this.toastr.error({
              //   detail: 'Error',
              //   summary: res.message,
              //   duration: 5000,
              // });
              return;
            }
            observable.next(res.result);
          },
          error: (err) => {
            observable.error(err);
          },
        });
    });
  }

}