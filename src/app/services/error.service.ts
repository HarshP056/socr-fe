import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ExceptionService {
  _apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  deleteAllException() {
    return this.http.delete(`${this._apiUrl}exception-log/deleteAll`);
  }

  getExceptions(query: any, search: any) {
    return this.http.get(
      `${this._apiUrl}exception-log/exceptionLog?order=${query.order}&page=${query.page}&limit=${query.limit}&startDate=${search.startDate}&txId=${search.txId}&uri=${search.uri}&endDate=${search.endDate}&errorCode=${search.errorCode}&status=${search.status}&title=${search.title}`
    );
  }

  getExceptionById(id: string) {
    return this.http.get(`${this._apiUrl}exception-log/exceptionLog/${id}`);
  }

  updateExceptionResolver(id: number, query: any): Observable<any> {
    return new Observable((observable) => {
      this.http
        .put(
          `${this._apiUrl}exception-log/resolver/${id}${this.apiQueryParams.get(
            query
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
              observable.next(res);
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
}
