import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})
export class OcrRulesService {

  private apiUrl: string = environment.apiUrl + 'rules';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService) {}

  createRule(data:any, projectId : string) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/create?projectId=${projectId }`, data).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
          observable.error(err);
        },
      });
    });
  }

  updateRule(data:any, id: string, projectId : string) {
    return new Observable((observable) => {
      this.http.put(`${this.apiUrl}/${id}?projectId=${projectId }`, data).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
          observable.error(err);
        },
      });
    });
  }

  runTest(data:any, id: string ) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/test/${id}`, data).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
          observable.error(err);
        },
      });
    });
  }
  deleteRule(id: number) {
    return new Observable((observable) => {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
          observable.error(err);
        },
      });
    });
  }

  getRuleById(id: string) {
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

  getAllRules() {
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

  getRulePages(query: any) {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/getAll${this.apiQueryParams.get(query)}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }
}
