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
import { SocrOcrService } from 'src/app/services/socr-ocr.service';


@Component({
  selector: 'app-mdi-response',
  templateUrl: './mdi-response.component.html',
  styleUrls: ['./mdi-response.component.scss']
})
export class MdiResponseComponent {
  mdiResponse: any;

  constructor(
    private ocrService: SocrOcrService,
    private dialogRef: MatDialogRef<MdiResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getMDIResponse();
  }

  getMDIResponse() {
    this.ocrService.getMDIResponse(this.data).subscribe({
      next: (res: any) => {
        this.mdiResponse = res.result;
      },
      error: (err: any) => {
      }
    })
  }

  ngOnDestroy() {}
}
