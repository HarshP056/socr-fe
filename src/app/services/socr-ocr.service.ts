import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SocrOcrService {
  _apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService

  ) { }

  getFormDetail(docId: string) {
    return new Observable((observable) => {
      this.http
        .get(
          `${this._apiUrl}formRecognizer/getJsonFile/${docId}`
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

  getImage(docId: any, pageNo: any) {
    return this.http.get(`${this._apiUrl}formRecognizer/showImage/${docId}/${pageNo}`)
  }

  getAllInvoices(data: any) {
    return new Observable((observable) => {
      this.http
        .get(
          `${this._apiUrl}formRecognizer/page${this.apiQueryParams.get(data)}`
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

  getStageCount(projectId: string) { return this.http.get(`${this._apiUrl}formRecognizer/stages/count${this.apiQueryParams.get(projectId)}`) };

  getMDIResponse(id: string) { return this.http.get(`${this._apiUrl}formRecognizer/getMDIResponse/${id}`);}

  getOCRInvoiceById(id: string) {
    return this.http.get(`${this._apiUrl}formRecognizer/get/${id}`);
  }

  downloadXML(id: string) { return this.http.get(`${this._apiUrl}formRecognizer/downloadXML/${id}`, { responseType: 'blob' }); }

  uploadFile(file: any, projectId: string) {
    return this.http.post(`${this._apiUrl}formRecognizer/studioUploadFile/${projectId}`, file)
  }

  sendDocToMDI(projectId: string, txnId: string) {
    return this.http.get(`${this._apiUrl}formRecognizer/executeMDI/${projectId}/${txnId}`);
  }

  proceedToNextStage(requestId: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this._apiUrl}formRecognizer/sendNext/${requestId}`)
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

  getSOCRResponse(projectId: string) {
    return this.http.get(`${this._apiUrl}formRecognizer/getSOCRResponse/${projectId}`);
  }

  getInvoiceByRequestId(id: string) {
    return this.http.get(`${this._apiUrl}formRecognizer/${id}`);
  }

  updateHeaderAndLineItemofVerification(obj: any, requestId: any) {
    return new Observable((observable) => {
      this.http
        .post(
          `${this._apiUrl}formRecognizer/fields/${requestId}`, obj
        )
        .subscribe({
          next: (res: any) => {
            if (res.status === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: "Data saved successfully!!",
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
  };

  updateHeaderAndLineItemofVerificationProcess(obj: any, requestId: any) {
    return new Observable((observable) => {
      this.http
        .post(
          `${this._apiUrl}formRecognizer/verification/process/${requestId}`, obj
        )
        .subscribe({
          next: (res: any) => {
            if (res.status === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Data saved successfully!!',
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

  proceedToPreviousStage(requestId: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this._apiUrl}formRecognizer/backToPreviousStage/${requestId}`)
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

  reProcessInvoice(requestId:string){
    return new Observable((observable) => {
      this.http
        .get(`${this._apiUrl}formRecognizer/executeRulesInVerification/${requestId}`)
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

  checkRules(obj: any, requestId: any) {
    return new Observable((observable) => {
      this.http
        .post(
          `${this._apiUrl}formRecognizer/checkRule/${requestId}`, obj
        )
        .subscribe({
          next: (res: any) => {
            if (res.status === 'success') {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: "Rules Executed Successfully!!",
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
  };

}
