import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OCRService } from 'src/app/services/ocr.service';
import { OcrXmlComponent } from '../ocr-xml/ocr-xml.component';
import { SystemConfigService } from 'src/app/services/system-config.service';

@Component({
  selector: 'app-s1-response',
  templateUrl: './s1-response.component.html',
  styleUrls: ['./s1-response.component.scss']
})
export class S1ResponseComponent implements OnInit {
  xml : any;
  s1Response: any;
  systemConfig: any = {
    enable: false
  };
  constructor(
    private ocrService: OCRService,
    private dialogRef: MatDialogRef<OcrXmlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private systemConfigService: SystemConfigService,
  ) {}

  ngOnInit() {
    if(this.data.xmlInvoice){
      this.xml = this.data.xml;
      this.getXInvoiceData();
    }
    else{
      this.getS1Reponse();
    }
    this.getSystemConfig();
  }

  getS1Reponse() {
    this.ocrService.getSyncData(this.data.id).subscribe({
      next: (res: any) => {
        this.s1Response = res;
      },
      error: (err: any) => {
      }
    })
  }

  ngOnDestroy() {}

  getSystemConfig(){
    this.systemConfigService.getSystemConfigById('SYSTEM_CONFIG').subscribe({
      next:(res:any)=>{
        if(res){
          this.systemConfig = res;
        }
      },
      error: (error: any) => {},
    })
  }

  getXInvoiceData() {
    this.ocrService.getXInvoiceData(this.data.id).subscribe({
      next: (res: any) => {
        this.s1Response = res;
      },
      error: (err: any) => {
      }
    })
  }

}
