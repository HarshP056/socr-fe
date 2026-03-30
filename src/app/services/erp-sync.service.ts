import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class ERPSyncService {
  apiUrl: string = environment.apiUrl+'erp';

  constructor(private http: HttpClient, private apiQueryParams: ApiQueryParamsService) {}

  getErpSyncLogs(query:any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/ERPSyncStatus/page${this.apiQueryParams.get(query)}`)
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

  getErpSyncLogById(id: string) {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/ERPSyncData/${id}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  downloadERP(id: string) {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/getERPxml/${id}`, {responseType : 'text'}).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getErpSyncXMLLikeLogs(query:any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/erpSyncXMLLike${this.apiQueryParams.get(query)}`)
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
