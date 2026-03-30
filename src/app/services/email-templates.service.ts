import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplatesService {
  private apiUrl: string = environment.apiUrl + 'email-templates';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  getAllEmailTemplates() {
    return new Observable((observable) => {
      this.http
        .get(
          `${this.apiUrl}/getAll`
        )
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

  getEmailTemplateTypes() {
    return new Observable((observable) => {
      this.http
        .get(
          `${this.apiUrl}/getAllEmailTemplateTypes`
        )
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

  getEmailTemplateById(id: any): Observable<any> {
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

  createEmailTemplate(obj: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}`, obj).subscribe({
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

  updateEmailTemplates(id: any, obj: any) {
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

  deleteEmailTemplates(id: any) {
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

  exportEmailTemplates(query:any) {
    return this.http.post(`${this.apiUrl}/export`,query,{responseType:`blob`})
  }
}
