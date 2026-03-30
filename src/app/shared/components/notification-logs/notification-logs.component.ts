import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { NotificationLogService } from 'src/app/services/notification-log.service';

@Component({
  selector: 'app-notification-logs',
  templateUrl: './notification-logs.component.html',
  styleUrls: ['./notification-logs.component.scss'],
  standalone: false
})
export class NotificationLogsComponent implements OnInit {
  notificationLogs: any = [];
  initialLoader: boolean = false;
  totalElements: number = 0;
  queryParams: any = {
    limit: 10,
    order: '-createdDate',
    page: 1,
  };

  displayedColumns = [
    'emailFrom',
    'emailTo',
    'emailSend',
    'createdDate',
    'notificationType',
    'status',
  ];
  pageInd = 0;
  constructor(
    private dialogRef: MatDialogRef<NotificationLogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationLogService
  ) {}

  ngOnInit() {
    this.initialLoader = true;
    this.getChannelLog();
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page,
      query: this.data.id,
    };
    return obj;
  }

  getChannelLog() {
    this.notificationService.getNotificationLogs(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.notificationLogs = res['content'];
        this.totalElements = res.totalElements;
        this.initialLoader = false;
      },
      error: (err: any) => {
        this.initialLoader = false;
      },
    });
  }

  onPaginateChange(event: any) {
    this.pageInd = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.queryParams.page = this.pageInd;
    this.getChannelLog();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = sort.active;
      this.pageInd;
      this.queryParams.limit;
      this.getChannelLog();
    } else if (sort.direction === 'desc') {
      this.queryParams.order = '-' + sort.active;
      this.pageInd;
      this.queryParams.limit;
      this.getChannelLog();
    }
  }
}
