import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class OCRService {
  _apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  getAllInvoices(data: any) {
    return new Observable((observable) => {
      this.http
        .get(
          `${this._apiUrl}invoiceBuffer/page${this.apiQueryParams.get(data)}`
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

  runERPSync(obj: any, id: any) {
    return new Observable((observable) => {
      this.http
        .put(
          `${this._apiUrl}invoiceBuffer/erpSync/${id}${this.apiQueryParams.get(
            obj
          )}`,
          null
        )
        .subscribe({
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

  getOCRQueue() {
    return new Observable((observable) => {
      this.http.get(`${this._apiUrl}readEmail/update/ocrInvoice`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getNewQueue() {
    return new Observable((observable) => {
      this.http.get(`${this._apiUrl}readEmail/update/initInvoice`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getInvoiceById(id: string) {
    return this.http.get(`${this._apiUrl}invoiceBuffer/findById/${id}`);
  }

  deleteInvoiceById(id: string) {
    return this.http.delete(`${this._apiUrl}invoiceBuffer/delete/${id}`);
  }

  saveInvoice(data: any) {
    return this.http.post(`${this._apiUrl}invoiceBuffer/save`, data);
  }

  getInvoiceCount(query: any) {
    return this.http.get(`${this._apiUrl}invoiceBuffer/stl/count${this.apiQueryParams.get(query)}`);
  }

  getSyncData(requestId:string){
    return this.http.get(`${this._apiUrl}formRecognizer/getSyncData/${requestId}`, {responseType:'text'});
  }

  getXInvoiceData(requestId:string){
    return this.http.get(`${this._apiUrl}erp/getXInvoice/${requestId}`, {responseType:'text'});
  }
}
