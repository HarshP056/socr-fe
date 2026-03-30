import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MessageUserService } from 'src/app/services';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent {
  constructor(
    private messageSer: MessageUserService,
    private location: Location
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  onBack() {
    this.location.back();
  }
}
