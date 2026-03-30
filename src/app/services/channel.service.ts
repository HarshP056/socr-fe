import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrl: string = environment.apiUrl + 'channelConfig';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  getAllChannel(): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/findAll`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }
  getByIdChannel(id: any): Observable<any> {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/findById/${id}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getCannelByPage(data: any) {
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

  getChannelExecutionLog(data:any, query: any) {
    return new Observable((observable) => {
      this.http
        .get(`${environment.apiUrl}channelExecutionLog/getAll/${data}${this.apiQueryParams.get(query)}`)
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
  getChannelItemLog(id: any) {
    return new Observable((observable) => {
      this.http
        .get(`${environment.apiUrl}channelLog/getAllChannelLog/${id}`)
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

  postChannel(obj: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/save`, obj).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Channel Added Successfully!!',
            });
            observable.next(res.result);
            return;
          }
          else if(res.status === 'failed'){
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
            observable.error(res.result);
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

  putChannel(obj: any, id: any) {
    return new Observable((observable) => {
      this.http.put(`${this.apiUrl}/${id}`, obj).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: "Channel Updated Successfully!!",
            });
            observable.next(res.result);
            return;
          }
          else if(res.status === 'failed'){
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
            observable.error(res.result);
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

  deleteChannel(id: any) {
    return new Observable((observable) => {
      this.http.delete(`${this.apiUrl}/deleteById/${id}`).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          observable.next(res);
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

  exportChannel(query:any, data:any) {
    return this.http.post(`${this.apiUrl}/export${this.apiQueryParams.get(query)}`,data,{responseType:`blob`})
  }

  uploadChannelFile(data:any){
    return this.http.post(`${this.apiUrl}/upload`, data);
  }
}
