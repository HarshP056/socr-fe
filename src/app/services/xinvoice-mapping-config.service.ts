import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class XInvoiceMappingConfigService {
  private apiUrl: string = environment.apiUrl + 'xInvoiceMappingConfig';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  findAll(): Observable<any> {
    return new Observable((observer) => {
      this.http.get(`${this.apiUrl}/findAll`).subscribe({
        next: (res: any) => observer.next(res),
        error: (err) => observer.error(err),
      });
    });
  }

  findById(id: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get(`${this.apiUrl}/findById/${id}`).subscribe({
        next: (res: any) => observer.next(res),
        error: (err) => observer.error(err),
      });
    });
  }

  create(config: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/create`, config).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Config created' });
            observer.next(res.result);
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Create failed' });
          observer.error(err);
        },
      });
    });
  }

  update(id: string, config: any): Observable<any> {
    return new Observable((observer) => {
      this.http.put(`${this.apiUrl}/${id}`, config).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Config updated' });
            observer.next(res.result);
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Update failed' });
          observer.error(err);
        },
      });
    });
  }

  delete(id: string): Observable<any> {
    return new Observable((observer) => {
      this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe({
        next: (res: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Config deleted' });
          observer.next(res);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Delete failed' });
          observer.error(err);
        },
      });
    });
  }
}
