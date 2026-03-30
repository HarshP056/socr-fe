import { Component } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  syncData: any;
  initialLoader: boolean = false;
  en = environment.apiUrl;
  url: any = `${this.en}erp/sync-invoice`;
  constructor(private _testService: TestService) {}
  onClear() {
    this.syncData = '';
  }
  getSyncNow() {
    this.initialLoader = true;
    this._testService.getSyncNow().subscribe({
      next: (res: any) => {
        this.syncData = res;
        this.initialLoader = false;
      },
      error: (err) => {
        console.log(err);
        this.initialLoader = false;
      },
    });
  }

  // getSyncNow() {

  //  this._testService.getSyncNow().subscribe((blob: Blob) => {

  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'your-file.pdf';
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   });
  // }
}
