import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { MessageUserService, MiscService } from 'src/app/services';
import { DocIdRangeService } from 'src/app/services/doc-id-range.service';
import { SmartKeyStoreConfigService } from 'src/app/services/smart-key-store.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-smart-key-system',
  templateUrl: './smart-key-system.component.html',
  styleUrls: ['./smart-key-system.component.scss']
})
export class SmartKeySystemComponent {
  smartStore: any = {};
  isWait: boolean = false;
  show:boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private smartkeyStoreConfigService: SmartKeyStoreConfigService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    this.getSmartStore();
  }

  private getSmartStore() {
    this.smartkeyStoreConfigService.getSmartKeyStoreConfigData().subscribe({
      next: (res: any) => {
        this.smartStore = res;
      },
      error: (error) => {},
    });
  }

  submit() {
    this.updatesmartStore();
    return;
  }

  private updatesmartStore() {
    this.isWait = true;
    this.smartkeyStoreConfigService
      .updateSmartKeyStoreConfig({ ...this.smartStore }, this.smartStore.id)
      .subscribe({
        next: (res: any) => {
          this.getSmartStore();
          this.isWait = false;
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }

  ngOnDestroy(){
    this.messageSer.appSidebar=true;
  }

}
