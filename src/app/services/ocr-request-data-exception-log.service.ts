import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcrRequestDataExceptionLogService {
  apiUrl: string = environment.apiUrl+'ocrRequestDataExceptionLog';

  constructor(private http: HttpClient) {}

    getExceptionLogs(requestId: string) {
      return new Observable((observable) => {
        this.http.get(`${this.apiUrl}/${requestId}`).subscribe({
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
