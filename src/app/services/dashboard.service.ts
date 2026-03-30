import { Injectable } from '@angular/core';
import { ApiQueryParamsService } from './api-query-params.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  getDashboardCount(query:any) {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}common/dashboardcount${this.apiQueryParams.get(query)}`).subscribe({
          next: (res: any) => {
            observable.next(res);
          },
          error: (err) => {
            observable.error(err);
          },
        });
    });
  }

  getProcessAndExceptionInvoicesCountForGraph(query: any) {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}invoiceBuffer/stageCount${this.apiQueryParams.get(query)}`).subscribe({
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
