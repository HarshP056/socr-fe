import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OauthProfileService {
  _apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getOathProfiles() {
    return this.http.get(`${this._apiUrl}oauth-client-config/getAll`);
  }

  getOathdetail() {
    return this.http.get(`${this._apiUrl}oauth-client-config/getdetail`);
  }

  getOathProfileById(id: string) {
    return this.http.get(`${this._apiUrl}oauth-client-config/${id}`);
  }

  deleteOathProfile(id: string) {
    return this.http.delete(`${this._apiUrl}oauth-client-config/${id}`);
  }

  // saveOathProfile(data: any) {
  //   return this.http.post(`${this._apiUrl}oauth-client-config`, data);
  // }

  // updateOathProfile(data: any) {
  //   return this.http.put(`${this._apiUrl}oauth-client-config`, data);
  // }

  saveOathProfile(obj: any) {
    return new Observable((observable) => {
      this.http.post(`${this._apiUrl}oauth-client-config`, obj).subscribe({
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
  updateOathProfile(obj: any, id: any) {
    return new Observable((observable) => {
      this.http.put(`${this._apiUrl}oauth-client-config/${id}`, obj).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            observable.next(res);
          } else if (res.status === 'failed') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
          observable.next(res);
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
