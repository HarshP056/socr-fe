import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocIdLogService {
  private apiUrl: string = environment.apiUrl + 'docIdLog';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService
  ) {}

  getOcrQLogs(data: any) {
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
}
