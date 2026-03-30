import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ApiQueryParamsService } from './api-query-params.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReadEmailService {
  private apiUrl: string = environment.apiUrl + 'readEmail';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  runReadEmail(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/processAll`).subscribe({
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
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something wrong',
          });
          observable.error(err);
        },
      });
    });
  }

  runSplitPage(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/update/newInvoice`).subscribe({
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
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something wrong',
          });
          observable.error(err);
        },
      });
    });
  }
  runRecognizeOcr(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/update/ocrInvoice`).subscribe({
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
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something wrong',
          });
          observable.error(err);
        },
      });
    });
  }
  sendToOcr(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/update/initInvoice`).subscribe({
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
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something wrong',
          });
          observable.error(err);
        },
      });
    });
  }
  iniTinvoicE(id: any): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/update/initInvoice/${id}`).subscribe({
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
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something wrong',
          });
          observable.error(err);
        },
      });
    });
  }
  readEmail(channelId: any): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/${channelId}`).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail:
                'Channel is successfully processed. Please check the ocr queue',
            });
            observable.next(res.result);
            return;
          }
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something wrong',
          });
          observable.error(err);
        },
      });
    });
  }
}
