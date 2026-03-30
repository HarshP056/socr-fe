import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfDocumentViewerComponent } from '../pdf-document-viewer/pdf-document-viewer.component';
import { AlertLogService } from 'src/app/services/alert-log.service';
import { PageEvent } from '@angular/material/paginator';
import { read } from '@popperjs/core';

@Component({
  selector: 'app-alert-logs',
  templateUrl: './alert-logs.component.html',
  styleUrls: ['./alert-logs.component.scss'],
  standalone: false
})
export class AlertLogsComponent {
  query = {
    page: 1,
    limit: 10,
    order: '-date'
  }
  alertLogData:any=[];
  initialLoader:boolean = false;
  totalElements:any;
  pageInd:number=1;
  pageEvent: PageEvent;
  isSeen:boolean=false;

  constructor(
    private alertLogService: AlertLogService,
    private dialogRef: MatDialogRef<PdfDocumentViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){
    this.initialLoader
    this.getAlertLogs()
  }

  getAlertLogs(){
    this.alertLogService.getAllAlertLog(this.query).subscribe({
      next: (res: any) => {
        this.initialLoader = false;
        this.totalElements = res.totalElements
        this.alertLogData = res.content;
      },
      error: (err: any) => {
      },
    });
  }

  onPaginateChange(event: any) {
    this.initialLoader = true;
    this.pageInd = event.pageIndex + 1
    this.query.page = this.pageInd;
    this.query.limit = event.pageSize;
    this.getAlertLogs();
  }

  setReadStatus(index:any){
    if(this.alertLogData[index].read){
      return;
    }
    this.alertLogService
      .saveAlertLog(this.alertLogData[index].id)
      .subscribe({
        next: (res: any) => {
          this.alertLogData[index].read=true;
          this.getAlertLogs();
        },
        error: (err: any) => {
        },
      });
  }
}
