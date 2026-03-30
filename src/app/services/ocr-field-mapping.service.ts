import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class OcrFieldMappingService {
  private apiUrl: string = environment.apiUrl + 'ocr-field-mapping';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  getOcrFieldMappingName(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/data-fields`).subscribe({
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
