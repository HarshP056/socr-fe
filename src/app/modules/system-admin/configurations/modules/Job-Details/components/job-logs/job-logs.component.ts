import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { QuartzService } from 'src/app/services/quartz.service';
import cronstrue from 'cronstrue';
@Component({
  selector: 'app-job-logs',
  templateUrl: './job-logs.component.html',
  styleUrls: ['./job-logs.component.scss'],
})
export class JobLogsComponent {
  jobLogData: any = [];
  initialLoader: boolean = false;
  totalElements: number = 0;
  queryParams: any = {
    limit: 10,
    order: '-dateTime',
    page: 1,
  };

  displayedColumns = [
    // 'jobId',
    'type',
    'cronExpr',
    'startTime',
    'endTime',
    'dateTime',
    'status',
  ];
  pageInd = 0;
  constructor(
    private dialogRef: MatDialogRef<JobLogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobService: QuartzService
  ) {}

  ngOnInit() {
    this.initialLoader = true;
    this.getChannelLog();
  }

  private getArgsObj() {
    const obj: any = {
      size: this.queryParams.limit,
      orderBy: this.queryParams.order,
      page: this.queryParams.page,
    };
    return obj;
  }

  getChannelLog() {
    this.jobService.getJobLogs(this.getArgsObj(), this.data.jobName).subscribe({
      next: (res: any) => {
        this.jobLogData = res['content'].map((elem: any) => {
          elem.cronPattern = cronstrue.toString(elem.cronExpr);
          return elem;
        });
        console.log(this.jobLogData);
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
