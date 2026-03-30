import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class QuartzService {
  private apiUrl: string = environment.apiUrl + 'quartz';

  constructor(
    private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService,
    private messageService: MessageService
  ) {}

  pausejob(obj: any) {
    return new Observable((observable) => {
      this.http.put(`${this.apiUrl}/pause/${obj}`, null).subscribe({
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
  triggerjob(obj: any) {
    return new Observable((observable) => {
      this.http
        .put(`${this.apiUrl}/trigger${this.apiQueryParams.get(obj)}`, null)
        .subscribe({
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
  resumejob(obj: any) {
    return new Observable((observable) => {
      this.http.put(`${this.apiUrl}/resume/${obj}`, null).subscribe({
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
  postjob(obj: any) {
    return new Observable((observable) => {
      this.http.post(`${this.apiUrl}/schedule`, obj).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
          } else if (res.status === 'failed') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
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

  getJobByPage(data: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/jobs${this.apiQueryParams.get(data)}`)
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

  getJobLogs(data: any, jobName: any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/logs/${jobName}${this.apiQueryParams.get(data)}`)
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

  updateTrigger(jobName: any) {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/trigger/${jobName}`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  getCronTypes() {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/cronTypes`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }
  getJobTypes() {
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}/jobTypes`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          observable.error(err);
        },
      });
    });
  }

  deleteJobs(jobName: any) {
    return new Observable((observable) => {
      this.http.delete(`${this.apiUrl}/remove/${jobName}`).subscribe({
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
}
