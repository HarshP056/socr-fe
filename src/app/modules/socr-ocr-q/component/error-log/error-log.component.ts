import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OcrRequestDataExceptionLogService } from 'src/app/services/ocr-request-data-exception-log.service';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.scss']
})
export class ErrorLogComponent implements OnInit {

  @Input() errorObject: any;
  @ViewChild('comment', { static: false })
  comment: BasicModalComponent;
  @ViewChild('addComment', { static: false })
  addComment: TemplateRef<any>;
  isWait: boolean = false;
  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();
  errorLog: any;
  initialLoader: boolean = false;
  isLoading: boolean = false;
  txId: any;
  title:any;

  constructor(private ocrReqDataService: OcrRequestDataExceptionLogService,
    private dialogRef: MatDialogRef<ErrorLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.errorObject = this.data
    console.log(this.errorObject)
    this.initialLoader = true;
    this.getException();
  }

  getException() {
    this.ocrReqDataService.getExceptionLogs(this.errorObject.requestId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.errorLog = res;
        this.initialLoader = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }


  addComments() {
    this.txId = this.errorLog.txId;
    this.title = 'Resolved';
    this.comment.templateRef = this.addComment;
    this.comment.show();
  }

  onErrorClose(event: any) {
    this.comment.hide();
    if(this.errorObject.status === 'NEW'){
      this.onclose.emit();
    }
  }

  ngOnDestroy() {}

}
