import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageUserService, SystemConfigService } from 'src/app/services';

@Component({
  selector: 'app-socr-system-config',
  templateUrl: './socr-system-config.component.html',
  styleUrls: ['./socr-system-config.component.scss']
})
export class SocrSystemConfigComponent implements OnInit, OnDestroy{
  systemConfig: any = {
    enable: false,
    mdiBarcodeRecognitionEnable: false,
    barcodeEnable: false,
    qrCodeEnable: false,
    vectorSearch: false,
    id: 'SYSTEM_CONFIG'
  };

  constructor(
    private messageSer: MessageUserService,
    private sysConfigService: SystemConfigService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.getSystemConfig();
  }

  getToggle(event: any) {
    this.postSystemConfig();
  }


  getSystemConfig(){
    this.sysConfigService.getSystemConfigById(this.systemConfig.id).subscribe({
      next:(res:any)=>{
        if(res){
          this.systemConfig.enable = res.enable ? res.enable : false;
          this.systemConfig.mdiBarcodeRecognitionEnable = res.mdiBarcodeRecognitionEnable ? res.mdiBarcodeRecognitionEnable : false;
          this.systemConfig.barcodeEnable = res.barcodeEnable ? res.barcodeEnable : false;
          this.systemConfig.qrCodeEnable = res.qrCodeEnable ? res.qrCodeEnable : false;
          this.systemConfig.vectorSearch = res.vectorSearch ? res.vectorSearch : false;

        }
      },
      error:(error)=>{

      }
    })
  }

  postSystemConfig() {
    this.sysConfigService.saveOrUpdateSmartKeyStoreConfig(this.systemConfig, this.systemConfig.id).subscribe({
      next: (res: any) => {
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
}
