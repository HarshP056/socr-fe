import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {

  private apiUrl: string = environment.apiUrl + 'system-settings';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  getSystemConfig(id: any) {
    return new Observable((observable) => {
        this.http.get(`${this.apiUrl}/${id}`).subscribe({
          next: (res: any) => {
            observable.next(res);
          },
          error: (err) => {
            observable.error(err);
          },
        });
      });
  }

  putSystemConfig(id: any, obj: any) {
    return new Observable((observable) => {
      this.http.put(`${this.apiUrl}/${id}`, obj).subscribe({
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
