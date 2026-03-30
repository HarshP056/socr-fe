import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl: string = environment.apiUrl + 'application';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private apiQueryParams: ApiQueryParamsService
  ) {}

  saveApplication(data: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}`, data).subscribe({
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

  updateApplication(id: any, data:any) {
    return new Observable((observable) => {
      this.http.put(`${this.apiUrl}/${id}`, data).subscribe({
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

  applicationGetById(id: any) {
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
  
  getApplicationPage(query: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/page${this.apiQueryParams.get(query)}`)
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

  deleteApplication(id: any) {
    return new Observable((observable) => {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
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
}
