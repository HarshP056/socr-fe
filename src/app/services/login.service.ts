import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string = environment.apiUrl + 'auth';
  private httpClient: HttpClient;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }
  // /skeyapiv2/auth2/signin/{clientId}

  post$(loginData: LoginRequest): Observable<LoginResponse> {
    return new Observable((observable) => {
      this.httpClient.post(this.apiUrl + '/signin', loginData).subscribe({
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
