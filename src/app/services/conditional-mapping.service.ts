import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class ConditionMappingService {
  _apiUrl: string = environment.apiUrl + "dataBrowser/conditionalmapping";

  constructor(private http: HttpClient, private messageService: MessageService, private apiQueryParams: ApiQueryParamsService) {}
//   constructor(private http: HttpClient, private apiQueryParams: ApiQueryParamsService) {}

//   getMapping(query:any, logicalSystem:any) {
//     return this.http.get(`${this._apiUrl}?limit=${query.limit}&order=${query.order}&page=${query.page}&logicalSystem=${logicalSystem}`);
//   }
getMapping(query:any) {
    return new Observable((observable) => {
      this.http
        .get(`${this._apiUrl}${this.apiQueryParams.get(query)}`)
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

  getMappingById(id: string) {
    return this.http.get(`${this._apiUrl}/${id}`);
  }

  deleteMapping(id: string) {
    return this.http.delete(`${this._apiUrl}/${id}`);
  }

  saveMapping(data: any) {
    return this.http.post(`${this._apiUrl}`, data);
  }

  updateMapping(data: any, id:string) {
    return this.http.put(`${this._apiUrl}/${id}`, data);
  }

}
