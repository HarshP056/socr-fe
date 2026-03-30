import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OcrConfigService } from 'src/app/services';
import { OCRService } from 'src/app/services/ocr.service';

@Component({
  selector: 'app-ocr-xml',
  templateUrl: './ocr-xml.component.html',
  styleUrls: ['./ocr-xml.component.scss']
})
export class OcrXmlComponent {
  errorLog: any;
  hasHtmlTags: boolean = false;

  constructor(
    private ocrService: OCRService,
    private dialogRef: MatDialogRef<OcrXmlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getOCRXML();
  }

  getOCRXML() {
    this.ocrService.getInvoiceById(this.data).subscribe({
      next: (res: any) => {
        const htmlPattern = /<[^>]*>/;
        this.hasHtmlTags = htmlPattern.test(res.ocrXML);
        console.log(this.hasHtmlTags)
        if(this.hasHtmlTags){
          this.errorLog = res.ocrXML;
          return 
        }
        else{
          this.errorLog = JSON.parse(res.ocrXML);

        }
      },
      error: (err: any) => {
      }
    })
  }

  ngOnDestroy() {}
}
