import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})
export class EmailClassificationWorkflowService {

private apiUrl: string = environment.apiUrl + 'wf';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  createEmailClassificationWorkflow(obj: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/create`, obj).subscribe({
        next: (res: any) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            observable.next(res);
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

  updateEmailClassificationWorkflow(obj: any, id:any) {
    return new Observable((observable) => {
      this.http.put(`${this.apiUrl}/${id}`, obj).subscribe({
        next: (res: any) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            observable.next(res);
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

  getEmailClassificationWorkflowById(id:any) {
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

  getAllEmailClassificationWorkflow() {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/findAll`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getEmailClassificationWorkflowByPage(data: any, classifierId: string) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/page/${classifierId}${this.apiQueryParams.get(data)}`)
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

  deleteEmailClassificationWorkflow(id:any) {
    return new Observable((observable) => {
      this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe({
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
