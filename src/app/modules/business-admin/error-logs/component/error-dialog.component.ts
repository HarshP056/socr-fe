import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ExceptionService } from 'src/app/services/error.service';
import { ErrorLogsComponent } from '../error-logs.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnDestroy, OnInit {
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
  constructor(private exceptionService: ExceptionService) {}

  ngOnInit() {
    console.log(this.errorObject);
    this.initialLoader = true;
    this.getException();
  }

  getException() {
    this.exceptionService.getExceptionById(this.errorObject.txId).subscribe({
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
