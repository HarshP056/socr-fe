import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})
export class OcrProjectService {
  private apiUrl1: string = environment.apiUrl;
  private apiUrl: string = environment.apiUrl + 'ocrProject';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) { }

  getOcrProfileName(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/names`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }
  getOcrProfile(): Observable<any> {
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
  getByIdOcrProfile(id: any): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/findById/${id}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getOcrProjectsPage(data: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/page${this.apiQueryParams.get(data)}`)
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

  postOcrProfile(obj: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/create`, obj).subscribe({
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
  putOcrProfile(obj: any, id: any) {
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

  deleteOcrProfile(id: any) {
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

  duplicateProfile(id: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/duplicate/${id}`, {}).subscribe({
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

  exportOcrProject(query:any, data:any) {
    return this.http.post(`${this.apiUrl}/export${this.apiQueryParams.get(query)}`,data,{responseType:`blob`})
  }

  saveLLMRule(data: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/lm-rule/create`, data).subscribe({
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

  getLLMRuleById(data: any) {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/lm-rule/getRule${this.apiQueryParams.get(data)}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getLLMRulesPage(data: any) {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/lm-rule/getRules${this.apiQueryParams.get(data)}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  deleteLLMRule(data: any) {
    return new Observable((observable) => {
      this.http.delete(`${this.apiUrl}/lm-rule/deleteRule/${data}`).subscribe({     
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
