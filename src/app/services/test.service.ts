import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient,) {

  }
  getSyncNow() {
    return this.http.get(`${this.apiUrl}erp/sync-invoice`,{ responseType: 'text' });
  }

  uploadFileToMDI(data:any,channelId:any) {
    return this.http.post(`${this.apiUrl}formRecognizer/uploadFiles/${channelId}`, data)
  }


  // getSyncNow(): Observable<Blob> {
  //   // Define the headers if needed
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/xml', 
  //   });
  //   return this.http.get(`${this.apiUrl}erp/sync-invoice`, {
  //     headers: headers,
  //     responseType: 'blob' // Specify the responseType as 'blob'
  //   });
  // }


}
