import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}


  getProperties(){
    return new Observable((observable) => {
      this.http.get(`${this.apiUrl}propertiesFile`).subscribe({
        next: (res: any) => {
          observable.next(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Some error occured.",
          });
          observable.error(err);
        },
      });
    });
  }

  
}
