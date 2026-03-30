import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})
export class PostedInvoiceDataService {
  private apiUrl: string = environment.apiUrl + 'invoice/postedData';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private apiQueryparams: ApiQueryParamsService
  ) {}

  getPostedData(data: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/page${this.apiQueryparams.get(data)}`)
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

  getPostedDataById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: string) {
    return new Observable((observable) => {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            observable.next(res);
          } else if (res.status === 'failed') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
            observable.error(res.message);
          }
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
