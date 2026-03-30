import { Injectable } from '@angular/core';
import { ApiQueryParamsService } from './api-query-params.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private apiUrl: string = environment.apiUrl + 'common';
  private apiUrl2: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  downloadDocURL(docId: string, systemId: any): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/buildDownloadDocURL/${systemId}/${docId}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getAuthTypes(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/channel/authtype`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getModeTypes(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/channel/modetypes`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getprocesserType(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/channel/processortypes`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getfiletypes(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/channel/supported-filetypes`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getRoles(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${environment.apiUrl}users/getAllRoles`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getEngines(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/ocrConfig/engineTypes`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  moveStatus(docId: any, obj: any) {
    return new Observable((observable) => {
      this.http
        .put(
          `${this.apiUrl}/status/change/${docId}${this.apiQueryParams.get(
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

  moveMultipleStatus(ids: any, newStatus: any) {
    return new Observable((observable) => {
      this.http
        .put(
          `${this.apiUrl}/status/change${this.apiQueryParams.get(newStatus)}`,
          ids
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

  downloadFile(systemId : any,docId : any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/buildDownloadDocURL/${systemId}/${docId}`)
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

  trainVendor(supplierId: string): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl2}migrate/train/vendor/${supplierId}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  textBasedTrainVendor(supplierId: string): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl2}migrate/textBased/vendor/${supplierId}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getFileLogs(data: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl2}file-move-logs/page${this.apiQueryParams.get(data)}`)
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
  
  
}
