import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertLogService {
  private apiUrl: string = environment.apiUrl + 'alertLog';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private apiQueryParams: ApiQueryParamsService
  ) {}

  getAlertLogCount(){
    return new Observable((observable) => {
        this.http
          .get(`${this.apiUrl}/count`)
          .subscribe({
            next: (res: any) => {
              observable.next(res);
            },
            error: (err) => {
              observable.error(err);
            },
          });
      });
  }

  getAllAlertLog(data: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/getAll${this.apiQueryParams.get(data)}`)
        .subscribe({
          next: (res: any) => {
            observable.next(res);
          },
          error: (err) => {
            observable.error(err);
          },
        });
    });
  }

  saveAlertLog(id:any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/${id}`, '').subscribe({
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

}
