import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {
  
  private apiUrl: string = environment.apiUrl + 'external';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  getIndecabSync(query:any) {
      return new Observable((observable) => {
        this.http.get(`${this.apiUrl}/indecab/sync${this.apiQueryParams.get(query)}`).subscribe({
            next: (res: any) => {
              observable.next(res);
            },
            error: (err) => {
              observable.error(err);
            },
          });
      });
  }

  getHotelbillSync(query:any) {
      return new Observable((observable) => {
        this.http.get(`${this.apiUrl}/hotelbill/sync${this.apiQueryParams.get(query)}`).subscribe({
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
