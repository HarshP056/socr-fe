import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})
export class OcrCronService {
  apiUrl: string = environment.apiUrl+'cronJob';
  apiUrl2: string = environment.apiUrl+'rules';

  constructor(private http: HttpClient,
    private apiQueryParams: ApiQueryParamsService) {}

  getCronDetails(query:any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/page${this.apiQueryParams.get(query)}`)
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

  getJobExecutionLog(query:any) {
    return new Observable((observable) => {
      this.http
        .get(`${this.apiUrl}/executeLog/page${this.apiQueryParams.get(query)}`)
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

  runNewJob(jobId:any){
    return new Observable((observable) => {
    this.http
      .get(`${this.apiUrl}/runJob/${jobId}`)
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

  runRecognizingJob(){
  return new Observable((observable) => {
  this.http
    .get(`${this.apiUrl}/recognizingRequestJob`)
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

  statusChange(jobId:any, obj:any){
  return new Observable((observable) => {
  this.http
    .put(`${this.apiUrl}/${jobId}`, obj)
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

  getRuleLogs(requestId: any){
  return new Observable((observable) => {
    this.http
      .get(`${this.apiUrl2}/ruleEngineLog/${requestId}`)
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
}
