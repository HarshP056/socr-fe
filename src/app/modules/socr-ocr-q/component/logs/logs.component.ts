import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { OcrConfigService, OcrProjectService } from 'src/app/services';
import { OcrCronService } from 'src/app/services/ocr-cron.service';

interface queryParams {
  page: number;
  order: string;
  limit: number;
  jobId: string ;
  requestId: string;
  projectId: string;
  txId: string;
}
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {

  executionLogs: any[] = [];
  displayedColumns: string[] = [
    'projectId',
    'requestId',
    // 'txId',
    'stage',
    'startDate',
    'endDate',
    'status',

  ];
  title: any;
  status = ['NEW', 'RESOLVED']

  queryParams: queryParams = {
    page: 1,
    order: '-startDate',
    limit: 10,
    jobId: this.data ,
    requestId: this.data.requestId,
    projectId: '',
    txId: '',
  };
  totalElements: number = 0;
  pageInd: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  txId: any;
  project: any[]= [];

  constructor(
    private cronService: OcrCronService,
    public dialog: NgDialogAnimationService,
    private ocrConfigService: OcrConfigService,
    private ocrProjectService: OcrProjectService,
    private dialogRef: MatDialogRef<LogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
      this.initialLoader = true;
      this.getOcrProjects();
    }

  getExecutionLogs() {
    console.log(this.data.stage)

    if(this.data.stage === 'Verification' || this.data.stage === 'Processed'){
      this.cronService
      .getRuleLogs(this.data.requestId)
      .subscribe({
        next: (res: any) => {
          this.executionLogs = res.result;
          // this.totalElements = res.totalElements;
          this.resettingLoader = false;
          this.initialLoader = false;
          this.isLoading = false;
        },
        error: (err: any) => {
        },
      });
    }  else{
      this.cronService
      .getJobExecutionLog(this.queryParams)
      .subscribe({
        next: (res: any) => {
          this.executionLogs = res.content;
          this.totalElements = res.totalElements;
          this.resettingLoader = false;
          this.initialLoader = false;
          this.isLoading = false;
        },
        error: (err: any) => {
        },
      });
    }

  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.pageInd = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getExecutionLogs();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getExecutionLogs();
  }



  search() {
    this.isLoading = true;
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.getExecutionLogs();
  }

  reset() {
    this.resettingLoader = true;
    this.queryParams.order = '-dateTime';
    this.queryParams.projectId = '';
    this.queryParams.requestId = '';
    this.queryParams.txId = '';

    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.resettingLoader = true;
    this.getExecutionLogs();
  }

  queyList: any = {
    page: 1,
    limit: 50,
    order: "-projectNameOrGuid"
  }


  getOcrProjects() {
    this.ocrProjectService.getOcrProjectsPage(this.queyList).subscribe({
      next: (res: any) => {
        this.project = res['content'];
        this.getExecutionLogs();
        this.initialLoader = false;
      },
      error: (err: any) => {
        this.initialLoader = false;
      },
    });
  }

  getProJectName(projectId: string) {
    let project = this.project.find((x) => x.id === projectId);
    return project ? project.projectNameOrGuid : projectId;
  }

}
