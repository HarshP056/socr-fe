import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private apiQueryparams: ApiQueryParamsService
  ) {}

  // getUsers(query: any, search: any) {
  //   return this.http.get(
  //     `${this._apiUrl}users/page?order=${query.order}&page=${query.page}&limit=${query.limit}&role=${search.role}&query=${search.query}`
  //   );
  // }

  getUsers(data: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this._apiUrl}users/page${this.apiQueryparams.get(data)}`)
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

  getUsersById(id: string) {
    return this.http.get(`${this._apiUrl}users/${id}`);
  }

  // deleteUser(id: string) {
  //   return this.http.delete(`${this._apiUrl}users/${id}`);
  // }

  // saveUser(data: any) {
  //   return this.http.post(`${this._apiUrl}users`, data);
  // }
  deleteUser(id: string) {
    return new Observable((observable) => {
      this.http.delete(`${this._apiUrl}users/${id}`).subscribe({
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
            observable.error(res.message);
          }
          return;
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

  saveUser(obj: any) {
    return new Observable((observable) => {
      this.http.post(`${this._apiUrl}users`, obj).subscribe({
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
            observable.next(res);

            // observable.error(res.message);
          }
          return;
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

  // updateUser(data: any, id:string) {
  //   return this.http.put(`${this._apiUrl}users/${id}`, data);
  // }

  updateUser(obj: any, id: string) {
    return new Observable((observable) => {
      this.http.put(`${this._apiUrl}users/${id}`, obj).subscribe({
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
            observable.next(res);

            // observable.error(res.message);
          }
          return;
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

  changeUserPassword(data: any) {
    return new Observable((observable) => {
      this.http.put(`${this._apiUrl}users/update/password`, data).subscribe({
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
}
